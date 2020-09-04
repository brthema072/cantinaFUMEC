import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url_api= 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  users(): Observable<User[]>{
    return this.http.get<User[]>(`${this.url_api}/users`);
  }

  login(email: string, password: string){
    return this.http.get<User[]>(`${this.url_api}/users?email_like=`+email);
  }

  register(user: User):Observable<User>{
    return this.http.post<User>(`${this.url_api}/users`, user);
  }

  clear(){
    localStorage.clear();
  }

  isAuthenticated(){
    return (localStorage.getItem('user')!=null? true: false);
  }

  logout(){
    this.clear();
  }
}
