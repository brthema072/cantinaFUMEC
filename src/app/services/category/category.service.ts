import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url_api= 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  categories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.url_api}/category`);
  }

  categoryById(id: string | number): Observable<Category>{
    return this.http.get<Category>(`${this.url_api}/category/`+id);
  }
  
  postCategory(category: Category){
    return this.http.post<Category>(`${this.url_api}/category`,category);
  }

  put(category: Category): Observable<Category>{
    return this.http.put<Category>(`${this.url_api}/category/${category.id}`, category);
  }

  putCategory(category: Category): Observable<Category>{
    return this.put(category);
  }

  postProductMenuInCategory(category: Category): Observable<Category>{
    return this.put(category);
  }

  removProductMenuOfCategory(category: Category): Observable<Category>{
    return this.put(category);
  }

  removCategory(category: Category): Observable<Category>{
    return this.http.delete<Category>(`${this.url_api}/category/`+category.id)
  }

  putProductMenuOfCategory(category: Category): Observable<Category>{
    return this.put(category);
  }

  getCategoryByCardTitle(cardTitle: string):Observable<Category>{
    return this.http.get<Category>(`${this.url_api}/category?cardTitle=`+cardTitle)
  }
}
