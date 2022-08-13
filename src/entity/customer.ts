import Address from "./address";

export default class Customer {
    private readonly _id: string;
    private _name: string;
    private _address?: Address;
    private _active: boolean = false;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    validate() {
        if(!this._id) {
            throw new Error("Id is required");
        }
        if(!this._name) {
            throw new Error("Name is required");
        }
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    get name(): string {
        return this._name;
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    getId() {
        return this._id;
    }

    activate() {
        if(!this._address) {
            throw new Error("Address is mandatory to activate a Customer");
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    isActive(): boolean {
        return this._active;
    }
}
