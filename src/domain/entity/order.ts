import OrderItem from "./order-item";

export default class Order {
    private readonly _id: string;
    private readonly _customerId: string;
    private _items: OrderItem[];

    constructor(id: string, customerId: string, items: Array<OrderItem>) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this.validate();
    }

    private validate() {
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

    changeItems(items: Array<OrderItem>) {
        this._items = items;
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get items(): Array<OrderItem> {
        return this._items;
    }
}
