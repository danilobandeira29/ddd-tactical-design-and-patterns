import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import {InputCreateCustomerDto, OutputCreateCustomerDto} from "./create.customer.dto";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";

export default class CreateCustomerUseCase {
    constructor(private readonly repository: CustomerRepositoryInterface) {}

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
        const customer = CustomerFactory.createWithAddress(input);
        await this.repository.create(customer);
        return {
            id: customer.id,
            name: customer.name,
            address: {
                city: customer.address!.city,
                street: customer.address!.street,
                number: customer.address!.number,
                zip: customer.address!.zip
            }
        }
    }
}