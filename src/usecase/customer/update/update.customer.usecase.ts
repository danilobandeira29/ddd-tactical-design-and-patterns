import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import {InputUpdateCustomerDto, OutputUpdateCustomerDto} from "./update.customer.dto";
import Address from "../../../domain/customer/value-object/address";

export default class UpdateCustomerUseCase {
    constructor(private readonly repository: CustomerRepositoryInterface) {}

    async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
        const customer = await this.repository.find(input.id);
        customer.changeName(input.name);
        customer.changeAddress(new Address(input.address.street, String(input.address.number), input.address.zip, input.address.city));
        await this.repository.update(customer);
        return {
            id: customer.id,
            name: customer.name,
            address: {
                number: customer.address!.number,
                zip: customer.address!.zip,
                street: customer.address!.street,
                city: customer.address!.city
            }
        }
    }
}