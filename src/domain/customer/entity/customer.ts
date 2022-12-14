import Address from "../value-object/address";

export default class Customer {
    private readonly _id: string;
    private _name: string;
    private _address: Address | null = null;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

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

    get name(): string {
        return this._name;
    }

    get id() {
        return this._id;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get address(): Address | null {
        return this._address;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    changeAddress(address: Address) {
        this._address = address;
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

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }
}
