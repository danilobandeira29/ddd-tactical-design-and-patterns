import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import {InputCreateCustomerDto} from "./create.customer.dto";
import CreateCustomerUseCase from "./create.customer.usecase";

describe("Create Customer UseCase Unit", () => {
    let repository: CustomerRepositoryInterface;

    beforeEach(() => {
        repository = {} as CustomerRepositoryInterface;
    })

    it("should create customer", async () => {
        repository.create = jest.fn();
        const output = await new CreateCustomerUseCase(repository).execute(
            {
                name: "Danilo Bandeira",
                address: {
                    number: "1",
                    zip: "00000-000",
                    street: "street",
                    city: "city"
                }
            }
        )
        expect(output).toStrictEqual({
            id: expect.any(String),
            name: "Danilo Bandeira",
            address: {
                city: "city",
                street: "street",
                number: "1",
                zip: "00000-000"
            }
        })

    })
})