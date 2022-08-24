import Order from "../entity/order";
import Customer from "../../customer/entity/customer";
import OrderItem from "../entity/order-item";
import { v4 as uuid } from "uuid";

export default class OrderService {
    static placeOrder(customer: Customer, items: Array<OrderItem>): Order {
        const order = new Order(uuid(), customer.id, items);
        customer.addRewardPoints(order.total() / 2);
        return order;
    }

    static total(orders: Array<Order>): number {
        return orders.reduce((acc, order) => acc + order.total(), 0);
    }
}
