import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/model/cartItem.model';
import { OrderService } from 'src/app/services/order/order.service';
import { Order } from 'src/app/model/order.model';

@Component({
  selector: 'app-cart-iem-store',
  templateUrl: './cart-iem-store.component.html',
  styleUrls: ['./cart-iem-store.component.css']
})
export class CartIemStoreComponent implements OnInit {

  quantity: number = 1;
  total: number = 0;
  cartItem: CartItem[];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.cartItem = JSON.parse(localStorage.getItem('cartItem'));
    localStorage.setItem('cartItem',JSON.stringify(this.cartItem))

    this.cartItem.map((c)=>{
      this.quantity = c.quantity;
    })
    
    this.cartItem.map((c)=>{
      this.total = this.cartItem.length * c.value;
    })
  }

  onSubmit(){
    if(this.quantity<=0){
      alert('A quantidade deve ser maior que zero!');
    }else{
      const user = JSON.parse(localStorage.getItem('user'));
      const date: string = new Date().toString();
      
      let order: Order = {
        userEmail: user.email,
        date: date,
        value: this.total,
        items: this.cartItem
      }
      this.orderService.postOrder(order).subscribe(()=>{
        alert('Pedido realizado com sucesso!');
      })
    }
  }

}
