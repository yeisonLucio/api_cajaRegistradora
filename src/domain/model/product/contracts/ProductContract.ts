import { Product } from "../Product";

export interface ProductContract{
    newProduct(product: Product): Promise<Object>;
    getProduct(product: Product): Promise<Object>;
    deleteProduct(product: Product): Promise<Object>;
    updateProduct(product: Product): Promise<Object>;
    getProducts(skip: number, limit: number ): Promise<Object>;
}
