import { RepositoryContract } from "../dominio/contracts/RepositoryContract";
import { Movimiento } from "../dominio/Movimiento";
const MovimientoSchema = require("./MovimientoSchema");

export class MongoMovimientoRepository implements RepositoryContract {
  constructor() {}
  nuevoMovimiento(movimiento: Movimiento): Promise<Object> {
    return new Promise((resolve, reject) => {
      let movientoSchema = new MovimientoSchema({
        fechaHora: movimiento.getFechaHora(),
        tipoDinero: movimiento.getTipoDinero(),
        tipoMovimiento: movimiento.getTipoMovimiento(),
        dinero: movimiento.getDinero(),
      });

      movientoSchema.save((error: any, result: any) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  }
  obtenerMovimientosPorFecha(fechaHoraInicio: Date, fechaHoraFin: Date): Promise<Object[]> {
    return new Promise((resolve, reject) => {
        MovimientoSchema.find({"fechaHora": {
            "$gte": fechaHoraInicio,
            "$lt": fechaHoraFin
        }}, (error: any, result: any) => {
            if(error){
                reject(error);
            }
            resolve(result)
        })
      })
  }

  obtenerMovimientos(): Promise<Object[]>{
      return new Promise((resolve, reject) => {
        MovimientoSchema.find({})
        .exec((error: any, result: any) => {
          if(error){
              reject(error)
           }
           resolve(result);
        })
      })
  }
}
