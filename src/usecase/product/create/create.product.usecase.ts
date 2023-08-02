import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import {InputCreateProductDto, OutputCreateProductDto} from "./create.product.dto";
import Product from "../../../domain/product/entity/product";
import { v4 as uuid } from 'uuid'

export default class CreateProductUseCase {
    constructor(private readonly repository: ProductRepositoryInterface) {}

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
        const product = new Product(uuid(), input.name, input.price)
        await this.repository.create(product)
        return {
            name: product.name,
            price: product.price,
            id: product.id
        }
    }
}