
import { RepositoryContract } from "./contracts/RepositoryContract";
import { Movimiento } from "./Movimiento";

export class MovientoRepository {

    movimientoRepository: RepositoryContract;

    constructor(movimientoRepository: RepositoryContract){
        this.movimientoRepository = movimientoRepository;
    }


    agregarMovimiento(movimiento: Movimiento){
        return this.movimientoRepository.nuevoMovimiento(movimiento);
    }

    obtenerMovimientosPorFecha(fechaHoraInicio: Date, fechaHoraFin: Date): Promise<Object[]>{
        return this.movimientoRepository.obtenerMovimientosPorFecha(fechaHoraInicio, fechaHoraFin);
    }

    obtenerMovimientos(){
        return this.movimientoRepository.obtenerMovimientos();
    }
}