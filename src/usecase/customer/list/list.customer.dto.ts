export interface InputListCustomerDto {

}

export interface Customer {
    id: string;
    name: string;
    address: {
        street: string;
        number: string;
        zip: string;
        city: string;
    }
}

export interface OutputListCustomerDto {
    customers: {
        id: string;
        name: string;
        address: {
            street: string;
            number: string;
            zip: string;
            city: string;
        }
    }[]
}
