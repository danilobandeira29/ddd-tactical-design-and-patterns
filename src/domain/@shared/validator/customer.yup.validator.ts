import {ValidatorInterface} from "./validator.interface";
import Customer from "../../customer/entity/customer";
import * as yup from "yup";
import NotificationError from "../notification/notification.error";

export default class CustomerYupValidator implements ValidatorInterface<Customer> {
    validate(entity: Customer) {
        try {
            yup
                .object()
                .shape({
                    id: yup.string().required("Id is required"),
                    name: yup.string().required("Name is required")
                })
                .validateSync({
                    id: entity.id,
                    name: entity.name
                }, { abortEarly: false })
        } catch (e) {
            (e as yup.ValidationError).errors.forEach((error: string) => {
                entity._notification.addError({
                    context: "customer",
                    message: error
                })
            })
            throw new NotificationError(entity._notification.errors());
        }
    }
}