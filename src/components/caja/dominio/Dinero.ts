export class Dinero {

    private cantidad: number;
    private denominacion: number;
    private tipo: string;


    constructor(cantidad: number, denominacion: number, tipo: string){
        this.cantidad = cantidad;
        this.denominacion = denominacion;
        this.tipo = tipo;
    }
    
    public getCantidad(): number {
        return this.cantidad;
    }

    public setCantidad(cantidad: number): void {
        this.cantidad = cantidad;
    }

    public getDenominacion(): number {
        return this.denominacion;
    }

    public setDenominacion(denominacion: number): void {
        this.denominacion = denominacion;
    }

    public getTipo(): string {
        return this.tipo;
    }

    public setTipo(tipo: string): void {
        this.tipo = tipo;
    }





}