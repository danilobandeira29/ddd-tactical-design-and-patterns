import express, {Request, Response} from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";

export const customerRoutes = express.Router();
customerRoutes.post("/", async (req: Request, res: Response) => {
    const useCase = new CreateCustomerUseCase(new CustomerRepository());
    try {
        const customerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                number: req.body.address.number,
                zip: req.body.address.zip
            }
        }
        const result = await useCase.execute(customerDto)
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
    }
})
