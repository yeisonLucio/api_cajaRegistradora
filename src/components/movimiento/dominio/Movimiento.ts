import { Dinero } from "../../caja/dominio/Dinero";

export class Movimiento {

    private fechaHora: Date;
    private tipoMovimiento: string;
    private tipoDinero: string;
    private dinero: Dinero;


    constructor(fechaHora: Date, tipoMovimiento: string, tipoDinero: string,
        dinero: Dinero){
            this.fechaHora = fechaHora;
            this.tipoMovimiento = tipoMovimiento;
            this.tipoDinero = tipoDinero;
            this.dinero = dinero;
        
    }

    public getFechaHora(): Date {
        return this.fechaHora;
    }

    public setFechaHora(fechaHora: Date): void {
        this.fechaHora = fechaHora;
    }

    public getTipoMovimiento(): string {
        return this.tipoMovimiento;
    }

    public setTipoMovimiento(tipoMovimiento: string): void {
        this.tipoMovimiento = tipoMovimiento;
    }

    public getTipoDinero(): string {
        return this.tipoDinero;
    }

    public setTipoDinero(tipoDinero: string): void {
        this.tipoDinero = tipoDinero;
    }

    public getDinero(): Dinero {
        return this.dinero;
    }

    public setDinero(dinero: Dinero): void {
        this.dinero = dinero;
    }

    

}