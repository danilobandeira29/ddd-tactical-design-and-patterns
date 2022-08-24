import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import EventInterface from "../../../@shared/event/event.interface";

export default class LogWhenCustomerChangeAddressHandler implements EventHandlerInterface {
    handle(event: EventInterface) {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.nome} alterado para: ${event.eventData.endereco}`);
    }
}