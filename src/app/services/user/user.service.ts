import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url_api= 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  users(): Observable<User[]>{
    return this.http.get<User[]>(`${this.url_api}/users`);
  }

  getUserByEmail(email: string):Observable<User>{
    return this.http.get<User>(`${this.url_api}/users?email=`+email)
  }

  putUser(user: User): Observable<User>{
    return this.http.put<User>(`${this.url_api}/users/${user.id}`, user);
  }

  removUser(user: User): Observable<User>{
    return this.http.delete<User>(`${this.url_api}/users/`+user.id)
  }
}
