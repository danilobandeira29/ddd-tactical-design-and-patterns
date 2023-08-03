import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import ListCustomerUseCase from "./list.customer.usecase";

describe("List Customer UseCase", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should list the customers", async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = CustomerFactory.createWithAddress({
            name: "Danilo Bandeira",
            address: {
                city: "city",
                street: "street",
                number: "1",
                zip: "00000-000"
            }})
        const customer2 = CustomerFactory.createWithAddress({
            name: "Danilo Bandeira 2",
            address: {
                city: "cidade",
                street: "rua",
                number: "2",
                zip: "00000-002"
            }})
        await customerRepository.create(customer1);
        await customerRepository.create(customer2);
        const output = await new ListCustomerUseCase(customerRepository).execute({});
        expect(output.customers.length).toEqual(2);
        expect(output.customers[0]).toStrictEqual({
            id: customer1.id,
            name: "Danilo Bandeira",
            address: {
                city: "city",
                street: "street",
                number: "1",
                zip: "00000-000"
            }
        })
        expect(output.customers[1]).toStrictEqual({
            id: customer2.id,
            name: "Danilo Bandeira 2",
            address: {
                city: "cidade",
                street: "rua",
                number: "2",
                zip: "00000-002"
            }
        })
    })
})