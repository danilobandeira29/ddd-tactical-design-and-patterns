import express, { Express } from "express";
import dotenv from "dotenv";
import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../customer/repository/sequelize/customer.model";
import {customerRoutes} from "./routes/customer.routes";
import {productRoutes} from "./routes/product.routes";
import ProductModel from "../product/repository/sequelize/product.model";

dotenv.config();
export let sequelize: Sequelize;
(async () => {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
    });
    sequelize.addModels([CustomerModel, ProductModel]);
    await sequelize.sync();
})()
export const app: Express = express();
app.use(express.json());
app.use("/customers", customerRoutes);
app.use("/products", productRoutes);
const port = Number(process.env.PORT) || 3333;
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log("Server started at port: " + port);
});
