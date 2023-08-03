import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import {InputListProductDto, OutputListProductDto} from "./list.product.dto";

export default class ListProductUseCase {

    constructor(private readonly repository: ProductRepositoryInterface) {}

    async execute(input: InputListProductDto): Promise<OutputListProductDto> {
        const products = await this.repository.findAll();
        return {
            products: products.map(p => ({
                id: p.id,
                name: p.name,
                price: p.price
            }))
        }
    }
}
