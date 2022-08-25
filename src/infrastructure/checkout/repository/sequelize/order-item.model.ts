import {BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderModel from "./order.model";

@Table({
    tableName: "order_items",
    timestamps: false
})
export default class OrderItemModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => ProductModel)
    @Column({ allowNull: false })
    declare product_id: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;

    @ForeignKey(() => OrderModel)
    @Column({ allowNull: false })
    declare order_id: string;

    @BelongsTo(() => OrderModel)
    declare order: ReturnType<() => OrderModel>; // or Awaited<OrderModel> to get the type correctly after initialization

    @Column({ allowNull: false, type: DataType.INTEGER })
    declare quantity: number;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false, type: DataType.INTEGER})
    declare price: number;
}
