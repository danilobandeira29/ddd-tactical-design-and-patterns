import express, {Request, Response} from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";

export const productRoutes = express.Router();
productRoutes.post("/", async (req: Request, res: Response) => {
    const useCase = new CreateProductUseCase(new ProductRepository());
    try {
        const productDto = {
            name: req.body.name,
            price: req.body.price
        }
        const result = await useCase.execute(productDto)
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
    }
});

productRoutes.get("/", async(req: Request, res: Response) => {
    const useCase = new ListProductUseCase(new ProductRepository());
    try {
        const result = await useCase.execute({});
        res.status(200).send(result);
    } catch(e) {
        res.status(500).send(e);
    }
});
