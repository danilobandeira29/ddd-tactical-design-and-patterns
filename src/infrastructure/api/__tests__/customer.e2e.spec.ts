import {app, sequelize} from "../server";
import request from "supertest";

describe("Customer e2e tests", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "Danilo Bandeira",
                address: {
                    street: "street",
                    city: "city",
                    number: "1234",
                    zip: "00000-000"
                }
            })
        expect(response.status).toEqual(200);
        expect(response.body).toStrictEqual({
            id: expect.any(String),
            name: "Danilo Bandeira",
            address: {
                street: "street",
                city: "city",
                number: "1234",
                zip: "00000-000"
            }
        })
    })
})