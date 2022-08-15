import Order from "./order";

describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => new Order("", "customerId", [])).toThrowError("Id is required");
    })

    it("should throw error when customerId is empty", () => {
        expect(() => new Order("1234", "", [])).toThrowError("CustomerId is required");
    })

    it("should throw error when order items are empty", () => {
        expect(() => new Order("1234", "123", [])).toThrowError("Items are required");
    })
})
