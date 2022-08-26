import Customer from "../entity/customer";
import { v4 as uuid } from "uuid";
import Address from "../value-object/address";

interface CreateWithAddressProps {
    name: string
    address: {
        street: string;
        number: string;
        zip: string;
        city: string;
    }
}

export default class CustomerFactory {
    static create(name: string): Customer {
        return new Customer(uuid(), name);
    }

    static createWithAddress(props: CreateWithAddressProps): Customer {
        const address = new Address(props.address.street, props.address.number, props.address.zip, props.address.city);
        const customer = new Customer(uuid(), props.name);
        customer.changeAddress(address);
        return customer;
    }
}
