import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/model/category.model';
import { Product } from 'src/app/model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  category: Category = {
    id: 0,
    cardSubtitle: '',
    cardTitle: '',
    imagem: '',
    menu: []
  };
  categories: Category[];
  products: Product[];

  productFormGroup  = this.fb.group({
    id: [''],
    name: ['',[Validators.required]],
    description: ['',[Validators.required]],
    imagePath: ['',[Validators.required]],
    price: [0,[Validators.required]]
  })

  categoryId = null;
  constructor(private categoryService: CategoryService, 
    private route: ActivatedRoute, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.setProductsAndCategory();
  }

  onProductFormSubmit(){
    if(this.productFormGroup.valid){
      if(this.productFormGroup.value.price > 0){
        this.category.menu.push(this.productFormGroup.value);
        this.categoryService.postProductMenuInCategory(this.category).subscribe((cat)=>{
          alert('Produto adicionado a esta categoria!')
        })
      }else{
        alert('Preço tem que ser maior que zero!');
      }
    }
  }

  setProductsAndCategory(){
    if(this.products == undefined){
      this.categoryService.categoryById(this.route.snapshot.params['id']).subscribe((cat)=>{
        this.products = cat.menu;
        this.category = cat;
      })
    }else{
      this.categoryService.categoryById(this.categoryId).subscribe((cat)=>{
        this.products = cat.menu;
        this.category = cat;
      })
    }
    this.categoryService.categories().subscribe((cats)=>{
      this.categories = cats;
    })
  }

  categoryChange(){
    this.router.navigate([`/produtos/categoria/${this.categoryId}`]);
    this.setProductsAndCategory();
  }

  removeProduct(product){
    let cont: number = -1;
    this.category.menu.map((prod)=>{
      cont++;
      if(prod.id == product.id){
        this.category.menu.splice(cont,1);
        this.removeProd(this.category)
      }
    })
  }

  removeProd(category: Category){
    this.categoryService.removProductMenuOfCategory(category).subscribe(()=>{
      alert('Produto removido com sucrsso!')
    })
  }

  editProduct(product: Product){
    this.productFormGroup.setValue({
      id: product.id,
      name: product.name,
      description: product.description,
      imagePath: product.imagePath,
      price: product.price
    })
  }
  onPutProductFormSubmit(){
    let cont: number = -1;
    this.category.menu.map((prod)=>{
      cont++;
      if(prod.id == this.productFormGroup.value.id){
        this.category.menu[cont] = this.productFormGroup.value;
        this.putProduct(this.category)
      }
    })
  }

  putProduct(category: Category){
    this.categoryService.putProductMenuOfCategory(category).subscribe((res)=>{
      console.log(res);
    })
  }
}
