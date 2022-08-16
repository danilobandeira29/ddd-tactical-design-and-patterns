import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product Service unit tests", () => {
    it("should increase the price in a hundred per cent of a list of products", () => {
        // isso não vai ser utilizado numa base grande da dados
        // para alterar em larga escala, pode se fazer uma rotina no banco para executar isso ou algo nesse sentido
        // não pensar de forma extremista e achar que por ser regra de negócio deve ser necessário criar um service, etc
        const product1 = new Product("1", "Product 1", 10);
        const product2 = new Product("2", "Product 2", 20);
        ProductService.increasePrice([product1, product2], 100);
        expect(product1.price).toEqual(20);
        expect(product2.price).toEqual(40);
    })
})
