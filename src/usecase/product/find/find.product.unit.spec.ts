import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";
import {v4 as uuid} from "uuid";

describe("Unit test Find Product UseCase", () => {
    let repository: ProductRepositoryInterface;

    beforeEach(() => {
        repository = {} as ProductRepositoryInterface;
    })

    it("should be find a product", async () => {
        const product = new Product(uuid(), 'product 1', 200)
        repository.find = jest.fn().mockResolvedValueOnce(product);
        const output = await new FindProductUseCase(repository).execute({ id: product.id });
        expect(output).toStrictEqual({
            id: product.id,
            name: "product 1",
            price: 200
        });
    })
})