import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  products: any[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.categories().subscribe((cats)=>{
      if(cats.length>0){
        cats.map((c)=>{
          c.menu.map((p)=>{
            this.products.push(p)
          })
        })
      }
    })
  }

}
