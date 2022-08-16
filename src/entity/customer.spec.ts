import Customer from "./customer";
import Address from "./address";

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

    it("should throw error when trying to change customer name with empty name", () => {
        const customer = new Customer("123", "John");
        expect(() => customer.changeName("")).toThrowError("Name is required");
    })

    it("should throw error when trying to activate a customer and address is empty", () => {
        const customer = new Customer("123", "John");
        expect(() => customer.activate()).toThrowError("Address is mandatory to activate a Customer");
    })

    it("should activate customer", () => {
        const customer = new Customer("123", "John");
        const address = new Address("Street", "10", "64079-000", "City");
        customer.changeAddress(address);
        customer.activate();
        expect(customer.isActive()).toEqual(true);
    })

    it("should deactivate customer", () => {
        const customer = new Customer("123", "John");
        customer.deactivate();
        expect(customer.isActive()).toEqual(false);
    })

    it("should initialize with zero reward points", () => {
        const customer = new Customer("1", "Danilo Bandeira");
        expect(customer.rewardPoints).toEqual(0);
    })

    it("should add one hundred reward points", () => {
        const customer = new Customer("1", "Danilo Bandeira");
        customer.addRewardPoints(100);
        expect(customer.rewardPoints).toEqual(100);
    })
})
