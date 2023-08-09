import ProductInterface from "./product.interface";
import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";

export default class Product extends Entity implements ProductInterface {
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        super(id);
        this._name = name;
        this._price = price;
        this.validate();
    }

    validate() {
        if(!this._id) {
            this._notification.addError({
                context: "product",
                message: "Id is required"
            })
        }
        if(!this._name) {
            this._notification.addError({
                context: "product",
                message: "Name is required"
            })
        }
        if(this._price <= 0) {
            this._notification.addError({
                context: "product",
                message: "Price must be greater than zero"
            })
        }
        if(this._notification.hasAtLeastOneError()) {
            throw new NotificationError(this._notification.errors());
        }
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    get name(): string {
        return this._name;
    }

    changePrice(price: number) {
        this._price = price;
        this.validate();
    }

    get price(): number {
        return this._price;
    }
}
