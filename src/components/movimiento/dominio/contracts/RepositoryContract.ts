import { Movimiento } from "../Movimiento";


export interface RepositoryContract{
    nuevoMovimiento(movimiento: Movimiento): Promise<Object>;
    obtenerMovimientosPorFecha(fecha: Date, hora: Date): Promise<object[]>;
    obtenerMovimientos(): Promise<Object[]>;
    
}