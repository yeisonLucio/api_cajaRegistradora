import { Dinero } from "./Dinero";

export class Caja {

    private BaseCaja: Dinero[];
    private static instancia: Caja;
    private saldoCaja: Dinero[];
    private totalCaja: number;

    private constructor(){
        this.BaseCaja = [];
        this.totalCaja = 0;
        this.saldoCaja = [];
    }

    public static getInstancia(){
        if(this.instancia == null){
            this.instancia = new Caja();
        }
        return this.instancia;
    }

    public getBaseCaja(): Dinero[] {
        return this.BaseCaja;
    }

    public setBaseCaja(BaseCaja: Dinero[]): void {
        this.BaseCaja = BaseCaja;
    }

    public getTotalCaja(): number {
        return this.totalCaja;
    }

    public setTotalCaja(totalCaja: number): void {
        this.totalCaja = totalCaja;
    }

    public getSaldoCaja(): Dinero[] {
        return this.saldoCaja;
    }

    public setSaldoCaja(saldoCaja: Dinero[]): void {
        this.saldoCaja = saldoCaja;
    }
 
}