import express, {Request, Response} from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";
import CustomerPresenter from "../presenters/customer.presenter";

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

customerRoutes.get("/", async(req: Request, res: Response) => {
    const useCase = new ListCustomerUseCase(new CustomerRepository());
    try {
        const result = await useCase.execute({});
        res.format({
            json: () => res.send(result),
            xml: () => res.send(CustomerPresenter.listXML(result))
        })
    } catch(e) {
        res.status(500).send(e);
    }
})