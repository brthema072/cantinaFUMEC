import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/model/category.model';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];

  categoryFormGroup  = this.fb.group({
    id: 0,
    cardTitle: ['',[Validators.required]],
    cardSubtitle: ['',[Validators.required]],
    imagem: ['',[Validators.required]],
    menu:this.fb.array([])
  })

  products = this.categoryFormGroup.get('menu') as  FormArray;

  constructor(private categoryService: CategoryService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.categoryService.categories().subscribe((cat)=>{
      this.categories = cat;
    })
  }

  onCategoryFormSubmit(){
    if(this.categoryFormGroup.valid){
      this.categoryService.getCategoryByCardTitle(this.categoryFormGroup.value.cardTitle).subscribe((c: any)=>{
        if(c.length>0){
          alert('Não é permito cadastrar categorias com o mesmo título!')
        }else{
          this.categoryService.postCategory(this.categoryFormGroup.value).subscribe(()=>{
            alert('Categoria cadastrada com sucesso!');
            location.reload();
          })
        }
      })
    }
  }

  editCategory(category: Category){
    if(category.menu.length>=0){
      category.menu.forEach((m)=>{
        this.products.push(
          this.fb.group({description: m.description, id: m.id, imagePath: m.imagePath, name: m.name, price: m.price})
        )
      })
    }
    
    this.categoryFormGroup.setValue({
      id: category.id,
      cardTitle: category.cardTitle,
      cardSubtitle: category.cardSubtitle,
      imagem: category.imagem,
      menu: this.products.value
    })
  }

  removeCategory(category: Category){
    this.categoryService.removCategory(category).subscribe(()=>{
      alert('Categoria removido com sucrsso!')
    })
  }

  onPutCategoryFormSubmit(){
    if(this.categoryFormGroup.valid){
      this.categoryService.getCategoryByCardTitle(this.categoryFormGroup.value.cardTitle).subscribe((c: any)=>{
        if(c.length>0){
          alert('Não é permito cadastrar categorias com o mesmo título!')
        }else{
          this.categoryService.putCategory(this.categoryFormGroup.value).subscribe(()=>{
            alert('Categoria alterada com sucesso!')
            location.reload();
          })
        }
      })
      
    }
  }
}
