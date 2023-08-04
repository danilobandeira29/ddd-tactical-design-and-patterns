import {app, sequelize} from "../server";
import request from "supertest";

describe("Customer e2e tests", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    })

    afterAll(async () => {
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

    it("should not create a Customer because address is empty", async() => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "Danilo Bandeira",
                address: {}
            })
        expect(response.status).toEqual(500);
    })

    it("should list Customers", async () => {
        const response1 = await request(app)
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
        expect(response1.status).toEqual(200);
        const response2 = await request(app)
            .post("/customers")
            .send({
                name: "Ana Banana",
                address: {
                    street: "street",
                    city: "city",
                    number: "1234",
                    zip: "00000-000"
                }
            })
        expect(response2.status).toEqual(200);
        const response = await request(app)
            .get("/customers")
        expect(response.status).toEqual(200);
        expect(response.body.customers.length).toEqual(2);
        expect(response.body.customers[0]).toStrictEqual({
            id: expect.any(String),
            name: "Danilo Bandeira",
            address: {
                street: "street",
                city: "city",
                number: "1234",
                zip: "00000-000"
            }
        })
        expect(response.body.customers[1]).toStrictEqual({
            id: expect.any(String),
            name: "Ana Banana",
            address: {
                street: "street",
                city: "city",
                number: "1234",
                zip: "00000-000"
            }
        })
    })
})