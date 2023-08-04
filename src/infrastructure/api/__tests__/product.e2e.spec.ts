import {app, sequelize} from "../server";
import request from "supertest";

describe("Product e2e tests", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    })

    afterAll(async () => {
        await sequelize.close();
    })

    it("should create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "product 1",
                price: 100
            })
        expect(response.status).toEqual(200);
        expect(response.body).toStrictEqual({
            id: expect.any(String),
            name: "product 1",
            price: 100
        })
    })

    it("should not create a Product because name is empty", async() => {
        const response = await request(app)
            .post("/products")
            .send({
                price: 200,
            })
        expect(response.status).toEqual(500);
    })

    it("should list Products", async () => {
        const response1 = await request(app)
            .post("/products")
            .send({
                name: "product 1",
                price: 200
            })
        expect(response1.status).toEqual(200);
        const response2 = await request(app)
            .post("/products")
            .send({
                name: "product 2",
                price: 400
            })
        expect(response2.status).toEqual(200);
        const response = await request(app)
            .get("/products")
        expect(response.status).toEqual(200);
        expect(response.body.products.length).toEqual(2);
        expect(response.body.products[0]).toStrictEqual({
            id: expect.any(String),
            name: "product 1",
            price: 200
        })
        expect(response.body.products[1]).toStrictEqual({
            id: expect.any(String),
            name: "product 2",
            price: 400
        })
    })
})