import { ProductContract } from "../../model/product/contracts/ProductContract";
import { Product } from "../../model/product/Product";

export class ProductUseCase {

    private product: ProductContract;

    constructor(product: ProductContract){
        this.product = product;
    }

    newProduct(product: Product){
        /* 
        logic
        */
       return this.product.newProduct(product);
    }

    getProduct(product: Product){

        return this.product.getProduct(product);
    }

    getProducts(skip: number, limit: number){
      return this.product.getProducts(skip, limit);
    }

    removeProduct(product: Product){

        return this.product.deleteProduct(product);
    }

    updateProduct(product: Product){
        return this.product.updateProduct(product);
    }




}