import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order-item";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";

describe("Order Repository tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        sequelize.addModels([CustomerModel, ProductModel, OrderModel, OrderItemModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a order", async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer("1", "Customer 1");
      const address = new Address("Street", "1234", "Zip", "City");
      customer.changeAddress(address);
      await customerRepository.create(customer);
      const productRepository = new ProductRepository();
      const product = new Product("1", "Product 1", 4000);
      await productRepository.create(product);
      const orderItem = new OrderItem("1", product.name, product.price, product.id, 4);
      const order = new Order("1", customer.id, [orderItem]);
      const orderRepository = new OrderRepository();
      await orderRepository.create(order);
      const orderModel = await OrderModel.findOne({ where: { id: order.id }, include:["items"] });
      expect(orderModel?.toJSON()).toStrictEqual({
          id: order.id,
          customer_id: order.customerId,
          total: order.total(),
          items: [
              {
                  id: orderItem.id,
                  name: orderItem.name,
                  price: orderItem.price,
                  product_id: orderItem.productId,
                  quantity: orderItem.quantity,
                  order_id: order.id
              }
          ]
      });
    });
});
