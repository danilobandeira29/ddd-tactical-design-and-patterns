import Address from "../value-object/address";
import Entity from "../../@shared/entity/entity.abstract";
import CustomerValidatorFactory from "../factory/customer.validator.factory";

export default class Customer extends Entity {
    private _name: string;
    private _address: Address | null = null;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super(id);
        this._name = name;
        this.validate();
    }

    validate() {
       CustomerValidatorFactory.create().validate(this);
    }

    get name(): string {
        return this._name;
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
