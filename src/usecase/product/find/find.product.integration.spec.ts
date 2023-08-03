import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";
import { v4 as uuid } from "uuid";

describe("Find Product Usecase", () => {
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

    it("should find a Product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product(uuid(), "product name", 400)
        await productRepository.create(product);
        const output = await new FindProductUseCase(productRepository).execute({ id: product.id });
        expect(output).toStrictEqual({
            id: product.id,
            name: "product name",
            price: 400
        });
    })
})