import Address from "../value-object/address";
import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";

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
        if(!this._id) {
            this._notification.addError({
                context: "customer",
                message: "Id is required"
            })
        }
        if(!this._name) {
            this._notification.addError({
                context: "customer",
                message: "Name is required"
            })
        }
        if(this._notification.hasAtLeastOneError()) {
            throw new NotificationError(this._notification.errors());
        }
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
