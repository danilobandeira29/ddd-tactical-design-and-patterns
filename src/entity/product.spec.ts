import Product from "./product";

describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => new Product("", "Product 1", 100)).toThrowError("Id is required");
    })
})
