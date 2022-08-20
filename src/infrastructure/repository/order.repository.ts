import Customer from "../../domain/entity/customer";
import Order from "../../domain/entity/order";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";

export default class OrderRepository {
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

    async update(entity: Customer): Promise<void> {
        throw new Error("Method not implemented");
    }

    async find(id: string): Promise<Customer> {
        throw new Error("Method not implemented");
    }

    async findAll(): Promise<Array<Customer>> {
        throw new Error("Method not implemented");
    }
}
