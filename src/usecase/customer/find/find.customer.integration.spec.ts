import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Find Customer Usecase", () => {
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

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = CustomerFactory.createWithAddress({
            name: "Danilo Bandeira",
            address: {
                city: "city",
                street: "street",
                number: "1",
                zip: "00000-000"
            }})
        await customerRepository.create(customer);
        const output = await new FindCustomerUseCase(customerRepository).execute({ id: customer.id });
        expect(output).toStrictEqual({
            id: customer.id,
            name: "Danilo Bandeira",
            address: {
                city: "city",
                street: "street",
                number: 1,
                zip: "00000-000"
            }
        })
    })
})