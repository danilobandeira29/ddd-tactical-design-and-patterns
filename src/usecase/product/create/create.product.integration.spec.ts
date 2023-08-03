import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Create Product Usecase", () => {
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

    it("should create a Product", async () => {
        const productRepository = new ProductRepository();
        const output = await new CreateProductUseCase(productRepository).execute({ price: 400 , name: "product 1"});
        expect(output).toStrictEqual({
            id: expect.any(String),
            name: "product 1",
            price: 400
        });
    })
})