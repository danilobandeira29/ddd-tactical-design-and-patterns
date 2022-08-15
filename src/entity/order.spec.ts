import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => new Order("", "customerId", [])).toThrowError("Id is required");
    })

    it("should throw error when customerId is empty", () => {
        expect(() => new Order("1234", "", [])).toThrowError("CustomerId is required");
    })

    it("should throw error when order items are empty", () => {
        expect(() => new Order("1234", "123", [])).toThrowError("Items quantity must be greater than zero");
    })

    it("should calculate total of 40 which is an item with a value of 35 and another item with a value of 5", () => {
        const item1 = new OrderItem("1", "Item 1", 35);
        const item2 = new OrderItem("2", "Item 2", 5);
        const order = new Order("123", "1234", [item1, item2]);
        expect(order.total()).toEqual(40);
    })
})
