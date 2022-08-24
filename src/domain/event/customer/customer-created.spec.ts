import EventDispatcher from "../@shared/event-dispatcher";
import EnviaConsoleLog1Handler from "./handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log-2.handler";
import Customer from "../../entity/customer";
import CustomerCreatedEvent from "./customer-created.event";

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
      expect(spyConsole).toHaveBeenNthCalledWith(1, "Esse é o primeiro console.log do evento: CustomerCreated")
      expect(spyConsole).toHaveBeenNthCalledWith(2, "Esse é o segundo console.log do evento: CustomerCreated");
   });
});
