import CustomerFactory from "./customer.factory";

describe("Customer Factory unit tests", () => {
    it("should create a customer", () => {
        const customer = CustomerFactory.create("Danilo Bandeira");
        expect(customer.id).toBeDefined();
        expect(customer.name).toEqual("Danilo Bandeira");
        expect(customer.address).toEqual(null);
    });

   it("should create a customer with address", () => {
       const createWithAddressProps = {
           name: "Danilo Bandeira",
           address: {
               street: "Street",
               number: "Number",
               zip: "00000-000",
               city: "City"
           }
       }
       const customer = CustomerFactory.createWithAddress(createWithAddressProps);
       expect(customer.id).toBeDefined();
       expect(customer.name).toEqual("Danilo Bandeira");
       expect(customer.address).toEqual({
           _street: "Street",
           _number: "Number",
           _zip: "00000-000",
           _city: "City"
       });
   })
});
