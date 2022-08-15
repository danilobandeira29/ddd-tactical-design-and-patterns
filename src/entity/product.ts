export default class Product {
    private readonly _id: string;
    private readonly _name: string;
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
    }
}
