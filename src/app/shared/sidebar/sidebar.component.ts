import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categoryLength: number = 0;
  productLength: number = 0;
  user: User = {
    uid: '',
    id: 0,
    name: '',
    email: '',
    cpf:'',
    phoneNumber: '',
    photoUrl: '',
    location: '',
    points: 0,
    settingsUser: { 
        language: '',
        type: ''
    }
  };

  constructor(private category: CategoryService, public authService: AuthService, private router: Router, 
                private userService: UserService){
  }

  ngOnInit(): void {
    this.category.categories().subscribe((cat)=>{
      if(cat.length>0){
        this.categoryLength = cat.length
        cat.map((c)=>{
          this.productLength += c.menu.length;
        })
      }else{
        this.categoryLength = 0;
      }
    })

    const user = JSON.parse(localStorage.getItem('user'))

    this.userService.getUserByEmail(user.email).subscribe((user:any)=>{
      if(user.length>0){
        this.user = user[0];
      }
    })
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
