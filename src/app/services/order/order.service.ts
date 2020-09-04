import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url_api= 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  orders(): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.url_api}/ordersList`);
  }

  getOrderByEmail(email: string): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.url_api}/ordersList?userEmail=${email}`);
  }

  getOrderByDate(date: string): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.url_api}/ordersList?date=${date}`);
  }

  postOrder(order: Order): Observable<Order>{
    return this.http.post<Order>(`${this.url_api}/ordersList`, order);
  }
}
