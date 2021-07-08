import { Request, Response } from "express"
import { Product } from "../../domain/model/product/Product"
import { Types } from "mongoose";
import { ProductRepository } from "../../repository/product/ProductRepository";
import { ProductUseCase } from "../../domain/useCase/product/ProductUseCase";



const newProduct = async (req: Request, res: Response) => {

    try {
        let {name, description, price, stock} = req.body;
        let id = new Types.ObjectId().toHexString();
        let product = new Product(id, name, description, price, stock);
        const productRepository = new ProductRepository();
        const productUseCase = new ProductUseCase(productRepository);
        const result = await productUseCase.newProduct(product);
    
        res.status(200).json({
            ok: true,
            product: result
        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }



}

module.exports = {
    newProduct
}