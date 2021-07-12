import { Dinero } from "../dominio/Dinero";

export class DineroUseCase{


    constructor(){}

    crearDinero(cantidad: number, denominacion: number): Promise<Dinero>{
        return new Promise((resolve, reject) => {
            let denominacionesPermitidas = [
                "100000",
                "50000",
                "20000",
                "10000",
                "5000",
                "1000",
                "500",
                "200",
                "100",
                "50",
              ];
              if (!denominacionesPermitidas.includes(denominacion.toString())) {
                return reject("Denominacion no permitida");
              }
              let dinero: Dinero;
        
              if (Number(denominacion) <= 1000) {
                dinero = new Dinero(cantidad, denominacion, "moneda");
              } else {
                dinero = new Dinero(cantidad, denominacion, "billete");
              } 
              resolve(dinero);
        })


    }
}