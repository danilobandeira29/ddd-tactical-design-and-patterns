export interface NotificationErrorProps {
    message: string;
    context: string;
}

export default class Notification {
    private readonly _errors: NotificationErrorProps[];

    constructor() {
        this._errors = [];
    }

    addError(n: NotificationErrorProps): void {
        this._errors.push(n);
    }

    messages(c?: NotificationErrorProps['context']): string {
        return this._errors
            .filter(e => c === undefined || e.context === c)
            .map(e => `${e.context}: ${e.message}`)
            .join(', ')
        ;
    }

    hasAtLeastOneError(): boolean {
        return this._errors.length > 0;
    }

    errors(): NotificationErrorProps[] {
        return this._errors;
    }
}