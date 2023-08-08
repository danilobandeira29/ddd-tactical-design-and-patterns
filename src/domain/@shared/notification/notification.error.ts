import {NotificationErrorProps} from "./notification";

export default class NotificationError extends Error {
    constructor(public readonly errors: NotificationErrorProps[]) {
        super(errors.map(e => `${e.context}: ${e.message}`).join(", "));
    }
}