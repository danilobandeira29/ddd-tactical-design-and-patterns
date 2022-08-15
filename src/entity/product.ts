export default class Product {
    private readonly _id: string;
    private _name: string;
    private readonly _price: number;

    constructor(id: string, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
    }

    validate() {
        if(!this._id) {
            throw new Error("Id is required");
        }
        if(!this._name) {
            throw new Error("Name is required");
        }
        if(this._price <= 0) {
            throw new Error("Price must be greater than zero");
        }
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    get name(): string {
        return this._name;
    }
}