import { CartItem } from './cartItem.model';

export interface Order{
    id?:string,
    userEmail:string,
    date: string,
    value: number,
    items: CartItem[]
}