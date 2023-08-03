import express, { Express } from "express";
import dotenv from "dotenv";
import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../customer/repository/sequelize/customer.model";

dotenv.config();
(async () => {
    const sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
    });
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
})()
const app: Express = express();
app.use(express.json());
const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log("Server started at port: " + port);
});
