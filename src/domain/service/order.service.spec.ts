import OrderItem from "../entity/order-item";
import Order from "../entity/order";
import OrderService from "./order.service";
import Customer from "../entity/customer";

describe("Order service unit tests", () => {
    it("should reward a customer with two hundred points of an order with total of four hundred", () => {
        const customer = new Customer("1", "Danilo");
        const item1 = new OrderItem("1", "Item 1", 50, "123", 2);
        const item2 = new OrderItem("2", "Item 2", 150, "123", 2);
        const order = OrderService.placeOrder(customer, [item1, item2]);
        expect(customer.rewardPoints).toEqual(200);
        expect(order.total()).toEqual(400);
    })

    it("should calculate total of all orders", () => {
        const item1 = new OrderItem("1", "Item 1", 100, "123", 2);
        const item2 = new OrderItem("2", "Item 2", 200, "1234", 4);
        const order1 = new Order("1", "c1", [item1]);
        const order2 = new Order("2", "c1", [item2]);
        const total = OrderService.total([order1, order2]);
        expect(total).toEqual(1000);
    })
})
