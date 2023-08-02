import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import ListCustomerUseCase from "./list.customer.usecase";

describe("Unit test List Customer UseCase", () => {
    let repository: CustomerRepositoryInterface;

    beforeEach(() => {
        repository = {} as CustomerRepositoryInterface;
    })

    it("should list customers", async () => {
        const customer1 = CustomerFactory.createWithAddress({
            name: "Danilo Bandeira",
            address: {
                number: "number",
                zip: "00000-000",
                street: "street",
                city: "city"
            }
        })
        const customer2 = CustomerFactory.createWithAddress({
            name: "Ana Banana",
            address: {
                number: "numero",
                zip: "00000-111",
                street: "rua",
                city: "cidade"
            }
        })
        repository.findAll = jest.fn().mockResolvedValueOnce([customer1, customer2]);
        const output = await new ListCustomerUseCase(repository).execute({});
        expect(output.customers.length).toEqual(2);
        expect(output.customers[0].id).toStrictEqual(customer1.id);
        expect(output.customers[0].name).toStrictEqual(customer1.name);
        expect(output.customers[0].address.street).toStrictEqual(customer1.address!.street);
        expect(output.customers[0].address.number).toStrictEqual(customer1.address!.number);
        expect(output.customers[0].address.zip).toStrictEqual(customer1.address!.zip);
        expect(output.customers[0].address.city).toStrictEqual(customer1.address!.city);
        expect(output.customers[1].id).toStrictEqual(customer2.id);
        expect(output.customers[1].name).toStrictEqual(customer2.name);
        expect(output.customers[1].address.street).toStrictEqual(customer2.address!.street);
        expect(output.customers[1].address.number).toStrictEqual(customer2.address!.number);
        expect(output.customers[1].address.zip).toStrictEqual(customer2.address!.zip);
        expect(output.customers[1].address.city).toStrictEqual(customer2.address!.city);
    })
})