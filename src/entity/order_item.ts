export default class OrderItem {
    _id: string;
    _name: string; // se eu fosse relacionar com um produto, provavelmente ele estaria em outro agregado e a relação seria feita por id(productId)
    _price: number;

    constructor(id: string, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;
    }
}
