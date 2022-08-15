import Customer from "./entity/customer";
import Address from "./entity/address";
import OrderItem from "./entity/order_item";
import Order from "./entity/order";

const customer = new Customer("1", "Danilo Bandeira");
const address = new Address("Street", "10", "64079-000", "City");
customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem("1", "Item 1", 4000, "12", 1);
const item2 = new OrderItem("2", "Item 2", 8000, "123", 2);
// como item está dentro do mesmo agregado, ele é relacionado com order pela própria entidade
// enquanto customer, que está em agregado diferente, é relacionado pelo id
const order = new Order("1", customer.getId(), [item1, item2]);
