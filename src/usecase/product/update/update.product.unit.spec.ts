import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import Product from "../../../domain/product/entity/product";
import { v4 as uuid } from "uuid";
import UpdateProductUseCase from "./update.product.usecase";

describe("Unit test List Product UseCase", () => {
    let repository: ProductRepositoryInterface;

    beforeEach(() => {
        repository = {} as ProductRepositoryInterface;
    })

    it("should list Products", async () => {
        const product1 = new Product(uuid(), "product 1", 100);
        repository.find = jest.fn().mockResolvedValueOnce(product1);
        repository.update = jest.fn();
        const output = await new UpdateProductUseCase(repository).execute({
            id: "123" ,
            name: "product updated",
            price: 400
        });
        expect(output).toStrictEqual({
            id: expect.any(String),
            name: "product updated",
            price: 400
        })
    })
})