import Product from "./product";

describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => new Product("", "Product 1", 100)).toThrowError("product: Id is required");
    })

    it("should throw error when name is empty", () => {
        expect(() => new Product("123", "", 100)).toThrowError("product: Name is required");
    })

    it("should throw error when price is less than zero", () => {
        expect(() => new Product("123", "Product 1", -1)).toThrowError("product: Price must be greater than zero");
    })

    it("should throw error when price is zero", () => {
        expect(() => new Product("123", "Product 1",0)).toThrowError("product: Price must be greater than zero");
    })

    it("should throw error when price and name are empty", () => {
        expect(() => new Product("123", "",0)).toThrowError("product: Name is required, product: Price must be greater than zero");
    })

    it("should throw error when id, name and price are empty", () => {
        expect(() => new Product("", "", 0)).toThrowError("product: Id is required, product: Name is required, product: Price must be greater than zero");
    })

    it("should change name", () => {
        const product = new Product("123", "Product 1", 100);
        product.changeName("Product 2");
        expect(product.name).toEqual("Product 2");
    })

    it("should throw error when trying to change name and name is empty", () => {
        const product = new Product("123", "Product 1", 100);
        expect(() => product.changeName("")).toThrowError("Name is required")
    })

    it("should change price", () => {
        const product = new Product("123", "Product 1", 100);
        product.changePrice(200);
        expect(product.price).toEqual(200);
    })

    it("should throw error when trying to change price and price is less than zero", () => {
        const product = new Product("123", "Product 1", 100);
        expect(() => product.changePrice(-1)).toThrowError("Price must be greater than zero");
    })

    it("should throw error when trying to change price and price is zero", () => {
        const product = new Product("123", "Product 1", 100);
        expect(() => product.changePrice(0)).toThrowError("Price must be greater than zero");
    })
})
