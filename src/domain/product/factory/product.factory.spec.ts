import ProductFactory from "./product.factory";

describe("Product Factory unit tests", () => {
    it("should create a product a", () => {
       const product = ProductFactory.create("a", "Product A", 4000);
       expect(product.id).toBeDefined();
       expect(product.name).toEqual("Product A");
       expect(product.price).toEqual(4000);
       expect(product.constructor.name).toEqual("Product");
    });

    it("should create a product b", () => {
        const product = ProductFactory.create("b", "Product B", 4000);
        expect(product.id).toBeDefined();
        expect(product.name).toEqual("Product B");
        expect(product.price).toEqual(8000);
        expect(product.constructor.name).toEqual("ProductB");
    });

    it("should throw an error when product type is not supported", () => {
        expect(() =>
            ProductFactory.create("not supported", "Product Not Supported", 4000))
            .toThrowError("Product type not supported");
    })
});
