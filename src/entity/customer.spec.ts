import Customer from "./customer";

describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => new Customer("", "John")).toThrowError("Id is required");
    })

    it("should throw error when name is empty", () => {
        expect(() => new Customer("123", "")).toThrowError("Name is required");
    })
})
