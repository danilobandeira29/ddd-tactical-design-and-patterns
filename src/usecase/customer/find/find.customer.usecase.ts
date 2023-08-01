import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import {InputFindCustomerDto, OutputFindCustomerDto} from "./find.customer.dto";

export default class FindCustomerUseCase {
    constructor(private readonly repository: CustomerRepositoryInterface) {}

    async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
        const customer = await this.repository.find(input.id)
        return {
            id: customer.id,
            name: customer.name,
            address: {
                city: customer.address!.city,
                street: customer.address!.street,
                number: Number(customer.address!.number),
                zip: customer.address!.zip
            }
        }
    }
}