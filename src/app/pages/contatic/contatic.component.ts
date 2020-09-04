import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-contatic',
  templateUrl: './contatic.component.html',
  styleUrls: ['./contatic.component.css']
})
export class ContaticComponent implements OnInit {

  users: User[];
  
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.users().subscribe((users:any)=>{
      if(users.length>0){
        this.users = users;
      }
    })
  }

}
