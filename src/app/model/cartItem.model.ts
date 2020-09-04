import { Product } from './product.model'

export interface CartItem{
    menuItem: Product;
    quantity: number;
    value: number;

    /* constructor(public menuItem: Product, public quantity: number = 1){ }

    value(): number{
        return this.menuItem.price * this.quantity;
    }; */

}