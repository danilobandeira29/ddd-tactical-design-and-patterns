import CustomerFactory from "./customer.factory";
import Address from "../value-object/address";

describe("Customer Factory unit tests", () => {
    it("should create a customer", () => {
        const customer = CustomerFactory.create("Danilo Bandeira");
        expect(customer.id).toBeDefined();
        expect(customer.name).toEqual("Danilo Bandeira");
        expect(customer.address).toEqual(null);
    });

   it("should create a customer with address", () => {
       const address = new Address("Street", "Number", "00000-000", "City");
       const customer = CustomerFactory.createWithAddress("Danilo Bandeira", address);
       expect(customer.id).toBeDefined();
       expect(customer.name).toEqual("Danilo Bandeira");
       expect(customer.address).toEqual(address);
   })
});
