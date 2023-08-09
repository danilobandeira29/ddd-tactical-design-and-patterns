import {ValidatorInterface} from "./validator.interface";
import Product from "../../product/entity/product";
import * as yup from "yup";
import NotificationError from "../notification/notification.error";

export default class ProductYupValidator implements ValidatorInterface<Product> {
    validate(entity: Product): void {
        try {
            yup
                .object()
                .shape({
                    id: yup.string().required("Id is required"),
                    name: yup.string().required("Name is required"),
                    price: yup.number().min(1, "Price must be greater than zero").required()
                })
                .validateSync({
                    id: entity.id,
                    name: entity.name,
                    price: entity.price
                }, { abortEarly: false })
        } catch (e) {
            (e as yup.ValidationError).errors.forEach((error) => {
                entity._notification.addError({
                    context: "product",
                    message: error
                });
            });
            throw new NotificationError(entity._notification.errors());
        }
    }
}