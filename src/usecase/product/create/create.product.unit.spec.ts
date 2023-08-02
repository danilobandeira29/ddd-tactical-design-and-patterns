import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import CreateProductUseCase from "./create.product.usecase";

describe("Unit test Create Product UseCase", () => {
    let repository: ProductRepositoryInterface;

    beforeEach(() => {
        repository = {} as ProductRepositoryInterface;
    })

    it("should be create a product", async () => {
        repository.create = jest.fn();
        const output = await new CreateProductUseCase(repository).execute({ name: "product name", price: 100 });
        expect(output).toStrictEqual({
            id: expect.any(String),
            name: "product name",
            price: 100
        });
    })
})