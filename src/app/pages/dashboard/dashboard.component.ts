import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  categoryLength: number = 0;
  productLength: number = 0;
  userLength: number = 0;

  constructor(private categoryService: CategoryService, private userService: UserService) { }

  ngOnInit() {
    this.categoryService.categories().subscribe((cat)=>{
      if(cat.length>0){
        this.categoryLength = cat.length
        cat.map((c)=>{
          this.productLength += c.menu.length;
        })
      }else{
        this.categoryLength = 0;
      }
    })

    this.userService.users().subscribe((u)=>{
      if(u.length>0){
        this.userLength = u.length;
      }
    })
  }

}
