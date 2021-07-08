import { Product } from "../../product/Product";

export interface ShoppingCartContract {
    addProduct(product: Product): Promise<Product[]>;
    removeProduct(product: Product): Promise<Product[]>;
}