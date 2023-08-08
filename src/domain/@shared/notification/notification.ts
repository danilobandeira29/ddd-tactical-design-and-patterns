export interface NotificationError {
    message: string;
    context: string;
}

export default class Notification {
    private readonly errors: NotificationError[];

    constructor() {
        this.errors = [];
    }

    addError(n: NotificationError): void {
        this.errors.push(n);
    }

    messages(c?: NotificationError['context']): string {
        return this.errors
            .filter(e => c === undefined || e.context === c)
            .map(e => `${e.context}: ${e.message}`)
            .join(', ')
        ;
    }
}