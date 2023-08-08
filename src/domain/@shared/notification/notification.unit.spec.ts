import Notification from "./notification";

describe("Notification unit tests", () => {
    it("should get error message passing the context", () => {
        const notification = new Notification();
        const customerError = {
            message: "Id is required",
            context: "customer"
        };
        notification.addError(customerError);
        expect(notification.messages("customer")).toStrictEqual("customer: Id is required");
        const customerError2 = {
            message: "Name is required",
            context: "customer"
        };
        const productError = {
            message: "Id is required",
            context: "product"
        };
        notification.addError(customerError2);
        notification.addError(productError);
        expect(notification.messages("customer")).toStrictEqual("customer: Id is required, customer: Name is required");
    })

    it('should get all message error message not passing the context', () => {
        const notification = new Notification();
        const customerError = {
            message: "Id is required",
            context: "customer"
        };
        const customerError2 = {
            message: "Name is required",
            context: "customer"
        };
        const productError = {
            message: "Id is required",
            context: "product"
        };
        notification.addError(customerError);
        notification.addError(customerError2);
        notification.addError(productError);
        expect(notification.messages()).toStrictEqual("customer: Id is required, customer: Name is required, product: Id is required");
    })
})