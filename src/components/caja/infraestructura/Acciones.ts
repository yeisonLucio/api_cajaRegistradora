import { Request, Response} from "express";
import { Types } from "mongoose";
import { Dinero } from "../dominio/Dinero";
import { CajaUseCase } from "../aplicacion/CajaUseCase";
import { Caja } from "../dominio/Caja";
import { CajaRepository } from "../dominio/CajaRepository";
import moment from "moment";

const agregarBaseCaja = async(req: Request, res: Response) => {
    try {
        let { cantidad, denominacion } = req.body;
        cantidad = Number(cantidad);
        denominacion = Number(denominacion);
        const repository = new CajaRepository();
        const cajaUseCase = new CajaUseCase(repository);
        let baseCaja = await cajaUseCase.agregarDineroBaseCaja(cantidad, denominacion);

        res.json({
            ok: true,
            baseCaja
        }) 
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }
}


const vaciarCaja = async(req: Request, res: Response) => {
    const repository = new CajaRepository();
    const cajaUseCase = new CajaUseCase(repository);
    cajaUseCase.vaciarCaja();
    res.json({
        ok: true,
        message: "Caja vaciada correctamente"
    })
}

const estadoActualCaja = async(req: Request, res: Response) => {
    try {
       
        const repository = new CajaRepository();
        const cajaUseCase = new CajaUseCase(repository);
        const estadoCaja =  await cajaUseCase.estadoActualCaja();
        let caja = Caja.getInstancia();
        res.json({
            ok: true,
            estadoCaja,
            totalCaja: caja.getTotalCaja()
        })
    } catch (error) {
     res.json({
         ok: false,
         error
     })
    }
}

const realizarPagoCaja = async(req: Request, res: Response) => {

    try {
        let { valorCompra, denominacion, cantidad } = req.body;
        valorCompra = Number(valorCompra);
        denominacion = Number(denominacion);
        cantidad = Number(cantidad);
        const repository = new CajaRepository();
        const cajaUseCase = new CajaUseCase(repository);
        let regreso =  await cajaUseCase.registrarPago(valorCompra, cantidad, denominacion);
        
        res.json({
            ok: true,
            regreso
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }


}

const reconstruirCaja = async(req: Request, res: Response) => {
    let {fechaHoraInicio, fechaHoraFin} = req.body;
    fechaHoraInicio = new Date(fechaHoraInicio);
    fechaHoraFin = new Date(fechaHoraFin);
    const repository = new CajaRepository();
    const cajaUseCase = new CajaUseCase(repository);
    const estadoCaja: any = await cajaUseCase.reconstruirCaja(fechaHoraInicio, fechaHoraFin);

    res.json({
        ok: true,
        saldoCaja: estadoCaja.saldoCaja,
        totalCaja: estadoCaja.totalCaja
    })

}

module.exports = {
    agregarBaseCaja,
    vaciarCaja,
    estadoActualCaja,
    realizarPagoCaja,
    reconstruirCaja
}






