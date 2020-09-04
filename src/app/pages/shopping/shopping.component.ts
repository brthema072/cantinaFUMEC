import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { Order } from 'src/app/model/order.model';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  orders: Order[];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));

    this.orderService.getOrderByEmail(user.email).subscribe((orders)=>{
      this.orders = orders
      console.log(orders)
    })
  }

}
