import { throws } from "assert";
import { DineroUseCase } from "../aplicacion/DineroUseCase";
import { Caja } from "./Caja";
import { CajaContract } from "./contracts/CajaContract";
import { Dinero } from "./Dinero";

export class CajaRepository implements CajaContract {
  
  constructor() {}

  agregarDineroBase(dinero: Dinero): Promise<Dinero[]> {
    return new Promise((resolve, reject) => {
      let caja = Caja.getInstancia();
      let baseCaja = caja.getBaseCaja();
      let index = baseCaja.findIndex(
        (item) => item.getDenominacion() == dinero.getDenominacion()
      );
      if (index > -1) {
        let cantidad =
          Number(baseCaja[index].getCantidad()) + Number(dinero.getCantidad());
        baseCaja[index].setCantidad(cantidad);
      } else {
        baseCaja.push(dinero);
      }
      caja.setBaseCaja(baseCaja);
      this.actualizarSaldoCaja(baseCaja);
      resolve(baseCaja);
    });
  }

  obtenerCajaBase(): Promise<Dinero[]> {
    return new Promise((resolve, reject) => {
      let caja = Caja.getInstancia();
      let baseCaja = caja.getBaseCaja();
      resolve(baseCaja);
    });
  }

  actualizarSaldoCaja(saldoCaja: Dinero[]): boolean {
    let caja = Caja.getInstancia();
    let totalCaja = 0;
    saldoCaja.forEach(item => {
      totalCaja = totalCaja + (item.getDenominacion() * item.getCantidad());
    })
    caja.setTotalCaja(totalCaja);
    caja.setSaldoCaja(saldoCaja);
    return true;
  }

  obtenerSaldoCaja(): Promise<Dinero[]> {
    return new Promise((resolve, reject) => {
      let caja = Caja.getInstancia();
      resolve(caja.getSaldoCaja());
    })
  }
}
