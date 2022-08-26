import Order from "../entity/order";
import OrderItem from "../entity/order-item";

interface CreateInterface {
    id: string;
    customerId: string;
    items: Array<ItemInterface>
}

interface ItemInterface {
    id: string;
    name: string;
    productId: string;
    price: number;
    quantity: number;
}

export default class OrderFactory {
    static create(props: CreateInterface): Order {
        const orderItems = props.items.map(item => new OrderItem(item.id, item.name, item.price, item.productId, item.quantity));
        return new Order(props.id, props.customerId, orderItems);
    }
}
