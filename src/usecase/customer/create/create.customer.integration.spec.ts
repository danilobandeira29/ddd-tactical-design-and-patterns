import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "./create.customer.usecase";

describe("Create Customer UseCase", () => {
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

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const output = await new CreateCustomerUseCase(customerRepository).execute({
            name: "Ana Banana",
            address: {
                city: "cidade",
                street: "rua",
                number: "24",
                zip: "11111-111"
            }
        });
        expect(output).toStrictEqual({
            id: expect.any(String),
            name: "Ana Banana",
            address: {
                city: "cidade",
                street: "rua",
                number: "24",
                zip: "11111-111"
            }
        })
    })
})
