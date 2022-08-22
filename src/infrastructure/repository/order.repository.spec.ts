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

    it("should create an order", async () => {
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

    it("should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street", "1234", "Zip", "City");
        customer.changeAddress(address);
        await customerRepository.create(customer);
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 4000);
        const product2 = new Product("2", "Product 2", 2000);
        await productRepository.create(product);
        await productRepository.create(product2);
        const orderItem = new OrderItem("1", product.name, product.price, product.id, 4);
        const orderItem2 = new OrderItem("2", product2.name, product2.price, product2.id, 2);
        const order = new Order("1", customer.id, [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);
        order.changeItems([orderItem2]);
        await orderRepository.update(order);
        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include:["items"] });
        expect(orderModel?.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: order.customerId,
            total: order.total(),
            items: [
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    product_id: orderItem2.productId,
                    quantity: orderItem2.quantity,
                    order_id: order.id
                }
            ]
        });
    });

    it("should find an order", async () => {
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
        const orderModel = await OrderModel.findOne({
            where: {
                id: order.id
            },
            include: [{ model: OrderItemModel }]
        });
        const foundOrder = await orderRepository.find(order.id);
        expect(orderModel?.toJSON()).toStrictEqual({
            id: foundOrder.id,
            total: foundOrder.total(),
            customer_id: foundOrder.customerId,
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
