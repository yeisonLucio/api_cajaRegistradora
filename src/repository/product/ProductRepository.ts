import { resolve } from "path/posix";
import { ProductContract } from "../../domain/model/product/contracts/ProductContract";
import { Product } from "../../domain/model/product/Product";
const ProductSchema = require("./ProductSchema");

export class ProductRepository implements ProductContract {
  newProduct(product: Product): Promise<Object> {
    return new Promise((resolve, reject) => {
      const newProduct = new ProductSchema({
        id: product.getId(),
        name: product.getName(),
        description: product.getDescription(),
        price: product.getPrice(),
        stock: product.getStock(),
      });

      newProduct.save((error: any, result: any) => {
        if(error){
            reject(error);
        }

        resolve(result);
      });
    });
  }
  getProduct(product: Product): Promise<Object> {
    return new Promise((resolve, reject) => {
      ProductSchema.findById(product.getId(), (error: any, result: any) => {
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      })
    })
  }
  deleteProduct(product: Product): Promise<Object> {
    return new Promise((resolve, reject) => {
      ProductSchema.findByIdAndRemove(product.getId(), (error: any, result: any) => {
        if(error){
          reject(error)
        }
        if(!result){
          resolve({
            ok: false,
            error: {
              message: "Producto no encontrado"
            }
          })
        }
        resolve(result)
      })
    })
  }
  updateProduct(product: Product): Promise<Object> {
    return new Promise((resolve, reject) => {
      let body = { 
        price: product.getPrice(),
        name: product.getName(),
        description: product.getDescription(),
        stock: product.getStock()
       };
      ProductSchema.findByIdAndUpdate(product.getId(), body, {new: true, runValidators: true}, (error: any, result: any) => {
        if(error){
          reject(error)
        }

        resolve(result);
      })
    })
  }

  getProducts(skip: number, limit: number): Promise<Object>{
    return new Promise((resolve, reject) => {
      ProductSchema.find({})
      .skip(skip)
      .limit(limit)
      .exec((error: any, result: any) => {
        if(error){
            reject({
              ok: false,
              error
            })
         }
        ProductSchema.countDocuments({}, (error: any ,conteo: any)=>{
            resolve({
              ok: true,
              productos: result,
              total: conteo
            })

        })
      })
    })
  }
}
