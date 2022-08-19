import CustomerRepositoryInterface from "../../domain/repository/customer.repository.interface";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import Address from "../../domain/entity/address";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        // o objeto de valor Address está sendo passado da maneira que o ORM espera receber
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address?.street,
            number: entity.address?.number,
            zipcode: entity.address?.zip,
            city: entity.address?.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        });
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            {
                name: entity.name,
                street: entity.address?.street,
                number: entity.address?.number,
                zipcode: entity.address?.zip,
                city: entity.address?.city,
                active: entity.isActive(),
                rewardPoints: entity.rewardPoints,
            },
            {
                where: {
                    id: entity.id,
                },
            }
        );
    }

    async find(id: string): Promise<Customer> {
        const customerModel = await CustomerModel.findOne({
            where: {
                id,
            }
        });
        if (!customerModel) {
            throw new Error("Customer not found");
        }
        const customer = new Customer(id, customerModel.name);
        const address = new Address(
            customerModel.street,
            customerModel.number,
            customerModel.zipcode,
            customerModel.city
        );
        customer.changeAddress(address);
        return customer;
    }

    async findAll(): Promise<Array<Customer>> {
        const customerModels = await CustomerModel.findAll();
        return customerModels.map((customerModels) => {
            const customer = new Customer(customerModels.id, customerModels.name);
            customer.addRewardPoints(customerModels.rewardPoints);
            const address = new Address(
                customerModels.street,
                customerModels.number,
                customerModels.zipcode,
                customerModels.city
            );
            customer.changeAddress(address);
            if (customerModels.active) {
                customer.activate();
            }
            return customer;
        });
    }
}
