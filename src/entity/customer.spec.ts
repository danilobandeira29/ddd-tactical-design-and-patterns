import Customer from "./customer";

describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => new Customer("", "John")).toThrowError("Id is required");
    })

    it("should throw error when name is empty", () => {
        expect(() => new Customer("123", "")).toThrowError("Name is required");
    })

    it("should change customer name", () => {
        const customer = new Customer("123", "John");
        customer.changeName("Jane");
        expect(customer.name).toEqual("Jane");
    })

    it("should throw error when try to activate a customer and address is empty", () => {
        const customer = new Customer("123", "John");
        expect(() => customer.activate()).toThrowError("Address is mandatory to activate a Customer");
    })
})
