import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import UpdateCustomerUseCase from "./update.customer.usecase";

describe("Unit test Update Customer", () => {
    let repository: CustomerRepositoryInterface;

    beforeEach(() => {
        repository = {} as CustomerRepositoryInterface;
    })

    it("should update a Customer", async () => {
        const customer = CustomerFactory.createWithAddress({
            name: "Danilo Bandeira",
            address: {
                street: "street",
                number: "1",
                zip: "00000-000",
                city: "city"
            }
        })
        repository.find = jest.fn().mockResolvedValueOnce(customer);
        repository.update = jest.fn();
        const input = {
            id: customer.id,
            name: "Danilo Bastos",
            address: {
                street: "rua",
                number: "2",
                zip: "11111-111",
                city: "cidade"
            }
        }
        const output = await new UpdateCustomerUseCase(repository).execute(input);
        expect(output).toStrictEqual(input);
    })
})