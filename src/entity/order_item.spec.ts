import OrderItem from "./order_item";

describe("Order unit tests", () => {
    it("should throw error when trying to create and quantity is less than zero", () => {
        expect(() => new OrderItem("1", "Item 1", 100, "123", -1)).toThrowError("Quantity must be greater than zero");
    })

    it("should throw error when trying to create and quantity is zero", () => {
        expect(() => new OrderItem("1", "Item 1", 100, "123", 0)).toThrowError("Quantity must be greater than zero");
    })
})
