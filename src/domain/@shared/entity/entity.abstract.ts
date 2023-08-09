import Notification from "../notification/notification";

export default abstract class Entity {
    protected readonly _id: string;
    readonly _notification: Notification;

    protected constructor(id: string) {
        this._id = id;
        this._notification = new Notification();
    }

    get id() {
        return this._id;
    }
}