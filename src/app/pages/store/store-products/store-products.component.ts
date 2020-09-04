import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { CartItem } from 'src/app/model/cartItem.model';

@Component({
  selector: 'app-store-products',
  templateUrl: './store-products.component.html',
  styleUrls: ['./store-products.component.css']
})
export class StoreProductsComponent implements OnInit {

  quantity: number = 1;

  product: Product ={
    id: '',
    imagePath: '',
    name: '',
    description: '',
    price: 0
  };

  constructor(private categoryService: CategoryService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.categoryService.categories().subscribe((cats)=>{
      cats.map((cat)=>{
        cat.menu.map((prod)=>{
          if(prod.id == this.route.snapshot.params['id']){
            this.product = prod;
          }
        })
      })
    })
  }

  addToCart(product: Product){
    if(this.quantity<=0){
      alert('A quantidade deve ser maior que zero!');
    }else{
      let cartItem: CartItem[] = [{
        menuItem: this.product,
        quantity: this.quantity,
        value: this.product.price * this.quantity
      }]
  
      localStorage.setItem('cartItem',JSON.stringify(cartItem))
      this.router.navigate(['/carrinho']);
    }
  }

}
