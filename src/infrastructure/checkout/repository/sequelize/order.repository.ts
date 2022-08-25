import Order from "../../../../domain/checkout/entity/order";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order.repository.interface";
import OrderItem from "../../../../domain/checkout/entity/order-item";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity
            }))
        },
            { include: [{ model: OrderItemModel }]});
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.destroy({
            where: {
                id: entity.id
            }
        });
        await OrderModel.create({
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity
                }))
            },
            { include: [{ model: OrderItemModel }]});
    }

    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({
            where: {
                id
            },
            include: [{ model: OrderItemModel }]
        });
        if (!orderModel) {
            throw new Error("Order not found");
        }
        const orderItems = orderModel.items.map(item => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity));
        return new Order(orderModel.id, orderModel.customer_id, orderItems);
    }

    async findAll(): Promise<Array<Order>> {
        const orderModels = await OrderModel.findAll({
            include: [{ model: OrderItemModel }]
        });
        return orderModels.map(orderModel => {
            const orderItems = orderModel.items.map(item => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity));
            return new Order(orderModel.id, orderModel.customer_id, orderItems);
        })
    }
}
