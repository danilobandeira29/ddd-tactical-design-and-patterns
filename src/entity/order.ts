import OrderItem from "./order_item";

export default class Order {
    private readonly _id: string;
    private readonly _customerId: string;
    private readonly _items: OrderItem[];

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this.validate();
    }

    validate() {
        if(!this._id) {
            throw new Error("Id is required");
        }
        if(!this._customerId) {
            throw new Error("CustomerId is required");
        }
        if(!this._items.length) {
            throw new Error("Items quantity must be greater than zero");
        }
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.price, 0);
    }
}
