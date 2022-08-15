import Order from "./order";

describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => new Order("", "customer_id", [])).toThrowError("Id is required");
    })
})
