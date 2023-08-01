import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import FindCustomerUseCase from "./find.customer.usecase";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";

describe("Unit test Find Customer Usecase", () => {
    let repository: CustomerRepositoryInterface;

    beforeEach(() => {
        repository = {} as CustomerRepositoryInterface;
    })

    it("should find a customer", async () => {
        const customer = CustomerFactory.createWithAddress({
            name: "Danilo Bandeira",
            address: {
                city: "city",
                street: "street",
                number: "1",
                zip: "00000-000"
            }})
        repository.find = jest.fn().mockResolvedValueOnce(customer)
        const output = await new FindCustomerUseCase(repository)
            .execute({ id: customer.id });
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