import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import Product from "../../../domain/product/entity/product";
import { v4 as uuid } from "uuid";
import ListProductUseCase from "./list.product.usecase";

describe("Unit test List Product UseCase", () => {
    let repository: ProductRepositoryInterface;

    beforeEach(() => {
        repository = {} as ProductRepositoryInterface;
    })

    it("should list all Products", async () => {
        const product1 = new Product(uuid(), "product 1", 100);
        const product2 = new Product(uuid(), "product 2", 200);
        repository.findAll = jest.fn().mockResolvedValueOnce([product1, product2]);
        const output = await new ListProductUseCase(repository).execute({});
        expect(output.products.length).toEqual(2);
        expect(output.products[0].id).toStrictEqual(product1.id)
        expect(output.products[0].name).toStrictEqual(product1.name)
        expect(output.products[0].price).toStrictEqual(product1.price)
        expect(output.products[1].id).toStrictEqual(product2.id)
        expect(output.products[1].name).toStrictEqual(product2.name)
        expect(output.products[1].price).toStrictEqual(product2.price)
    })
})