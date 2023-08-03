import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import { v4 as uuid } from "uuid";
import ListProductUseCase from "./list.product.usecase";

describe("List Product UseCase", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should list the Products", async () => {
        const productRepository = new ProductRepository();
        const product1 = new Product(uuid(), "product 1", 200);
        const product2 = new Product(uuid(), "product 2", 400);
        await productRepository.create(product1);
        await productRepository.create(product2);
        const output = await new ListProductUseCase(productRepository).execute({});
        expect(output.products.length).toEqual(2);
        expect(output.products[0].id).toStrictEqual(product1.id)
        expect(output.products[0].name).toStrictEqual(product1.name)
        expect(output.products[0].price).toStrictEqual(product1.price)
        expect(output.products[1].id).toStrictEqual(product2.id)
        expect(output.products[1].name).toStrictEqual(product2.name)
        expect(output.products[1].price).toStrictEqual(product2.price)
    })
})