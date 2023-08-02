import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import {InputListCustomerDto, OutputListCustomerDto} from "./list.customer.dto";

export default class ListCustomerUseCase {
    constructor(private readonly repository: CustomerRepositoryInterface) {}

    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const customers = await this.repository.findAll();
        return {
                customers: customers.map(c => ({
                id: c.id,
                name: c.name,
                address: {
                    street: c.address!.street,
                    city: c.address!.city,
                    zip: c.address!.zip,
                    number: c.address!.number
                }
            }))
        }
    }
}