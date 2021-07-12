import { Dinero } from "../Dinero";

export interface CajaContract {
    agregarDineroBase(dinero: Dinero): Promise<Dinero[]>;
    obtenerCajaBase(): Promise<Dinero[]>;
    actualizarSaldoCaja(dinero: Dinero[]): boolean;
    obtenerSaldoCaja(): Promise<Dinero[]>;
}