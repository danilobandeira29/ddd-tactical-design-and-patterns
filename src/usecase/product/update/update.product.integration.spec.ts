import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import { v4 as uuid } from "uuid";
import UpdateProductUseCase from "./update.product.usecase";
import {Sequelize} from "sequelize-typescript";

describe("Update Product UseCase", () => {
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

    it("should update a Product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product(uuid(), "product 1", 200);
        await productRepository.create(product);
        const output = await new UpdateProductUseCase(productRepository).execute({ id: product.id, name: "product updated", price: 400 });
        expect(output).toStrictEqual({
            id: product.id,
            name: "product updated",
            price: 400
        })
    })
})