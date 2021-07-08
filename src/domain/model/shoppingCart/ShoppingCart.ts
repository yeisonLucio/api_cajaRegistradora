import { Product } from "../product/Product";

export class ShoppingCart {

    private id: string;

    constructor(id: string){
        this.id = id;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }



   
    
}