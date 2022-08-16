import OrderItem from "../entity/order_item";
import Order from "../entity/order";
import OrderService from "./order.service";

describe("Order service unit tests", () => {
    it("should calculate total of all orders", () => {
        const item1 = new OrderItem("1", "Item 1", 100, "123", 2);
        const item2 = new OrderItem("2", "Item 2", 200, "1234", 4);
        const order1 = new Order("1", "c1", [item1]);
        const order2 = new Order("2", "c1", [item2]);
        const total = OrderService.total([order1, order2]);
        expect(total).toEqual(1000);
    })
})
