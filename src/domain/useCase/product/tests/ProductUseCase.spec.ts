import { ProductContract  } from "../../../model/product/contracts/ProductContract";
import { Product } from '../../../model/product/Product';
import { ProductUseCase } from '../ProductUseCase';

const saveProductRepo: jest.Mocked<ProductContract> = {
    newProduct: jest.fn(),
    deleteProduct: jest.fn(),
    getProduct: jest.fn(),
    updateProduct: jest.fn()
}

describe("Product", () => {
    test("save a product", async() => {
        const expeted = {
            ok: true
        };
        const product = new Product("123", "arroz", "arroz de prueba", 2000, 20);
        saveProductRepo.newProduct.mockImplementation((product) => {
           return new Promise((resolve, reject) => {
               resolve({
                   id: product.getId(),
                   name: product.getName(),
                   description: product.getDescription(),
                   price: product.getPrice(), 
                   stock: product.getStock()
               })
           })
        })
        const productUseCase = new ProductUseCase(saveProductRepo);
        await productUseCase.saveProduct(product)

        expect(saveProductRepo.newProduct).toHaveBeenCalledTimes(1);


        
    })

})