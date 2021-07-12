import { Request, Response} from "express";
import { Types } from "mongoose";
import { MongoMovimientoRepository } from "./MongoMovimientoRepository";
import { MovientoRepository } from "../dominio/MovimientoRepository";



const obtenerMovimientos = async(req: Request, res: Response) => {
    try {
        
        const mongoRepo = new MongoMovimientoRepository();
        const movimientoRepo = new MovientoRepository(mongoRepo);
        const movimientos = await movimientoRepo.obtenerMovimientos();

        res.json({
            ok: true,
            movimientos
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }



}


module.exports = {
    obtenerMovimientos,
}






