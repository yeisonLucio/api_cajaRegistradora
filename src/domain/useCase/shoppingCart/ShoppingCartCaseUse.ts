import { ProductRepository } from "../../../repository/product/ProductRepository";
import { Product } from "../../model/product/Product";
import { ShoppingCartContract } from "../../model/shoppingCart/contracts/ShoppingCartContract";

export interface IRespuesta {
    ok: boolean,
    message: "",
    error: null,
    data: Product[]
}

export class ShoppingCartUseCase {

    private shoppingCart: ShoppingCartContract;
    private productRepository: ProductRepository;
    constructor(shoppingCart: ShoppingCartContract){
        this.shoppingCart = shoppingCart;
        this.productRepository = new ProductRepository();
    }

    async addProductToShoppingCart(product: Product){

        try {
            if(product.getStock() > 0){
                let res = await this.shoppingCart.addProduct(product);
                product.setStock(product.getStock()-1);
                const result = await this.productRepository.updateProduct(product);
                return {
                    ok: true,
                    data: res
                }
            }
            
        } catch (error) {
            return {
                ok: false,
                error
            }
        }
    }

    removeProductOfShoppingCart(){

    }
}