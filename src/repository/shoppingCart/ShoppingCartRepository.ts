import { Product } from "../../domain/model/product/Product";
import { ShoppingCartContract } from "../../domain/model/shoppingCart/contracts/ShoppingCartContract";

 
 export class ShoppingCartRepository  implements ShoppingCartContract{

    private listProducts: Product[];

    constructor(){
        this.listProducts = [];
    }

    addProduct(product: Product): Promise<Product[]>{
        return new Promise((resolve, reject) => {
            this.listProducts.push(product);
            resolve(this.listProducts);
        })
        
    }

    removeProduct(product: Product): Promise<Product[]>{
        return new Promise((resolve, reject) => {
            this.listProducts = this.listProducts.splice(
                this.listProducts.findIndex((el) => el.getId() == product.getId()), 1)
                resolve(this.listProducts);
        })
        
    }


 }
 
