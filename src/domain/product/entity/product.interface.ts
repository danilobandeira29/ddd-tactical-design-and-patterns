export default interface ProductInterface {
    get id(): string;
    get price(): number;
    get name(): string;
    changeName(name: string): void;
    changePrice(price: number): void;
}
