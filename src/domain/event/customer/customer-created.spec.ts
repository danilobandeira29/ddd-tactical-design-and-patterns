import EventDispatcher from "../@shared/event-dispatcher";
import EnviaConsoleLog1Handler from "./handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log-2.handler";
import Customer from "../../entity/customer";
import CustomerCreatedEvent from "./customer-created.event";
import Address from "../../entity/address";
import LogWhenCustomerChangeAddressHandler from "./handler/log-when-customer-change-address.handler";
import CustomerAddressChangedEvent from "./customer-address-changed.event";

describe("Customer created tests", () => {
   it("should console log two messages when customer is created", () => {
      const eventDispatcher = new EventDispatcher();
      const enviaConsoleLog1Handler = new EnviaConsoleLog1Handler();
      const enviaConsoleLog2Handler = new EnviaConsoleLog2Handler();
      const spyConsole = jest.spyOn(console, "log");
      eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler);
      eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog2Handler);
      new Customer("1", "Danilo Bandeira");
      const customerCreatedEvent = new CustomerCreatedEvent({});
      eventDispatcher.notify(customerCreatedEvent);
      expect(spyConsole).toHaveBeenCalledTimes(2);
      expect(spyConsole).toHaveBeenNthCalledWith(1, "Esse é o primeiro console.log do evento: CustomerCreated")
      expect(spyConsole).toHaveBeenNthCalledWith(2, "Esse é o segundo console.log do evento: CustomerCreated");
   });

   it("should console log a message when address of a customer is changed", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new LogWhenCustomerChangeAddressHandler();
      const spyConsole = jest.spyOn(console, "log");
      eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
      const customer = new Customer("1", "Danilo Bandeira");
      const address = new Address("Street", "1", "00000000", "City");
      customer.changeAddress(address);
      const customerAddressChangedEvent = new CustomerAddressChangedEvent({
         id: customer.id,
         nome: customer.name,
         endereco: customer.address?.toString()
      });
      eventDispatcher.notify(customerAddressChangedEvent);
      expect(spyConsole).toHaveBeenCalledTimes(1);
      expect(spyConsole).toHaveBeenNthCalledWith(1, "Endereço do cliente: 1, Danilo Bandeira alterado para: Street, 1, 00000000, City");
   })
});
