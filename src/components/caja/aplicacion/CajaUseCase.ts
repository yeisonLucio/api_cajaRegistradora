import { MovientoRepository } from "../../movimiento/dominio/MovimientoRepository";
import { MongoMovimientoRepository } from "../../movimiento/infraestructura/MongoMovimientoRepository";
import { Caja } from "../dominio/Caja";
import { CajaContract } from "../dominio/contracts/CajaContract";
import { Dinero } from "../dominio/Dinero";
import { Movimiento } from "../../movimiento/dominio/Movimiento";
import { DineroUseCase } from "./DineroUseCase";
import { RepositoryContract } from "../../movimiento/dominio/contracts/RepositoryContract";

export class CajaUseCase {
  private caja: CajaContract;
  private dineroUseCase: DineroUseCase;
  private repositoryMovimiento: MovientoRepository;

  constructor(caja: CajaContract, repoBD: RepositoryContract) {
    this.caja = caja;
    this.dineroUseCase = new DineroUseCase();
    this.repositoryMovimiento = new MovientoRepository(repoBD);
  }

  /**
   * Permite agregar dinero a la caja base
   * @param cantidad
   * @param denominacion
   * @returns
   */
  public agregarDineroBaseCaja(cantidad: number, denominacion: number) {
    return new Promise(async (resolve, reject) => {
      try {
        let dinero = await this.dineroUseCase.crearDinero(cantidad, denominacion);
        let cajaBase = await this.caja.agregarDineroBase(dinero);
        let movimiento = new Movimiento(new Date(), "entrada", "base", dinero);
        this.repositoryMovimiento.agregarMovimiento(movimiento);
        resolve(cajaBase);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Retorna el dinero contenido en la caja base
   *
   * @returns
   */
  public getBaseCaja() {
    return this.caja.obtenerCajaBase();
  }

  public registrarPago(
    valorCompra: number,
    cantidad: number,
    denominacion: number
  ) {
    return new Promise(async (resolve, reject) => {
      let dinero = await this.dineroUseCase.crearDinero(cantidad, denominacion);

      /* Se valida si hay suficiente dinero en caja para dar el regreso */
      let caja = Caja.getInstancia();
      let saldoCaja = caja.getSaldoCaja();
      let cantidadDevolver = dinero.getDenominacion() - valorCompra;
      let dineroCaja = saldoCaja.filter(
        (item) =>
          item.getDenominacion() < cantidadDevolver &&
          Number.isInteger(cantidadDevolver / item.getDenominacion()) &&
          item.getCantidad() > cantidadDevolver / item.getDenominacion()
      );
      let opcionesRegreso = dineroCaja.sort(
        (a, b) => b.getDenominacion() - a.getDenominacion()
      );

      if (opcionesRegreso.length == 0) {
        return reject("No hay regreso para el dinero ingresado...");
      }

      /* Se calcula el regreso a devolver */
      let cantidadDineroRegreso =
        cantidadDevolver / opcionesRegreso[0].getDenominacion();
      let index = saldoCaja.findIndex(
        (item) => item.getDenominacion() == opcionesRegreso[0].getDenominacion()
      );
      saldoCaja[index].setCantidad(
        saldoCaja[index].getCantidad() - cantidadDineroRegreso
      );
      let dineroUseCase = new DineroUseCase();
      let regreso = await dineroUseCase.crearDinero(
        cantidadDineroRegreso,
        opcionesRegreso[0].getDenominacion()
      );

      /* Se actualiza la caja con el dinero que ingresó */
      let indexDineroCaja = saldoCaja.findIndex(
        (item) => item.getDenominacion() == dinero.getDenominacion()
      );
      if (indexDineroCaja > -1) {
        saldoCaja[indexDineroCaja].setCantidad(
          saldoCaja[indexDineroCaja].getCantidad() + dinero.getCantidad()
        );
      } else {
        saldoCaja.push(dinero);
      }
      if (this.caja.actualizarSaldoCaja(saldoCaja)) {
        let movimientoEntrada = new Movimiento(
          new Date(),
          "entrada",
          "saldo",
          dinero
        );
        this.repositoryMovimiento.agregarMovimiento(movimientoEntrada);
        let movimientoSalida = new Movimiento(
          new Date(),
          "salida",
          "saldo",
          regreso
        );
        this.repositoryMovimiento.agregarMovimiento(movimientoSalida);
        resolve(regreso);
      } else {
        reject("Ocurrio un error al actualizar la caja");
      }
    });
  }

  public estadoActualCaja() {
    return this.caja.obtenerSaldoCaja();
  }

  public vaciarCaja(): boolean {
    let caja = Caja.getInstancia();
    caja.setSaldoCaja([]);
    caja.setTotalCaja(0);
    caja.setBaseCaja([]);
    return true;
  }

  public async reconstruirCaja(fechaHoraInicio: Date, fechaHoraFin: Date) {
    try {
      const mongoRepo = new MongoMovimientoRepository();
      const movimientoRepo = new MovientoRepository(mongoRepo);
      const movimientos = await movimientoRepo.obtenerMovimientosPorFecha(
        fechaHoraInicio,
        fechaHoraFin
      );

      let saldoCaja: any[] = [];
      let movimientosEntrada = movimientos.filter(
        (elem: any) => elem.tipoMovimiento == "entrada"
      );
      let movimientosSalida = movimientos.filter(
        (elem: any) => elem.tipoMovimiento == "salida"
      );

      movimientosEntrada.forEach((elem: any) => {
        let index = saldoCaja.findIndex(
          (item) => item.denominacion == elem.dinero.denominacion
        );
        if (index > -1) {
          saldoCaja[index].cantidad = saldoCaja[index].cantidad + elem.dinero.cantidad;
        } else {
          saldoCaja.push(elem.dinero);
        }
      });

      movimientosSalida.forEach((elem: any) => {
        let index = saldoCaja.findIndex(
          (item) => item.denominacion == elem.dinero.denominacion
        );
        if (index > -1) {
          saldoCaja[index].cantidad = saldoCaja[index].cantidad - elem.dinero.cantidad;
        }
      });

      /* Se calcula el total de la caja */
      let totalCaja = 0;
      saldoCaja.forEach((elem) => {
        totalCaja = totalCaja + elem.cantidad * elem.denominacion;
      });

      this.vaciarCaja();
      let caja = Caja.getInstancia();
      caja.setSaldoCaja(saldoCaja);
      caja.setTotalCaja(totalCaja);

      return {
        saldoCaja: caja.getSaldoCaja(),
        totalCaja: caja.getTotalCaja(),
      };
    } catch (error) {
      return error;
    }
  }
}
