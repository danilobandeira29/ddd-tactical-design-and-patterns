import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import Product from "../../../../domain/product/entity/product";
import ProductRepository from "./product.repository";

describe("Product Repository tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a product", async () => {
     const productRepository = new ProductRepository();
     const product = new Product("1", "Product 1", 4000);
     await productRepository.create(product);
     const productModel = await ProductModel.findOne({ where: { id: "1" } });
     expect(productModel?.toJSON()).toStrictEqual({
         id: "1",
         name: "Product 1",
         price: 4000
     });
    })

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 4000);
        await productRepository.create(product);
        product.changePrice(1000);
        product.changeName("Product updated");
        await productRepository.update(product);
        const productModel = await ProductModel.findOne({ where: { id: "1" } });
        expect(productModel?.toJSON()).toStrictEqual({
            id: "1",
            name: "Product updated",
            price: 1000
        });
    })

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 4000);
        await productRepository.create(product);
        const productModel = await ProductModel.findOne({ where: { id: "1" } });
        const foundProduct = await productRepository.find("1");
        expect(productModel?.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price
        });
    })

    it("should find all products", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 4000);
        await productRepository.create(product);
        const product2 = new Product("2", "Product 2", 2000);
        await productRepository.create(product2);
        const foundProducts = await productRepository.findAll();
        expect([product, product2]).toEqual(foundProducts);
    })
})
