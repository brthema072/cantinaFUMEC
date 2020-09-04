import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  users: User[] = null;

  userFormBuilder  = this.fb.group({
    name: ['',[Validators.required]],
    email: ['',[Validators.email, Validators.required]],
    cpf: ['',[Validators.required, Validators.minLength(11)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rePassword: ['', [Validators.required, Validators.minLength(6)]],
    phoneNumber: ['', [Validators.required, Validators.minLength(11)]],
    photoUrl: ['', [Validators.required]],
    location: ['', [Validators.required]],
    points: [0, [Validators.required]]
  })

  constructor(private userService: UserService, private fb: FormBuilder, private authService: AuthService,
                private router: Router) { }

  ngOnInit() {
    this.userService.users().subscribe((u)=>{
      if(u.length>0){
        this.users = u;
      }else{
        this.users = null;
      }
    })
  }
  
  onUserFormBuilderSubmit(){
    if(this.userFormBuilder.valid){
      if(this.userFormBuilder.value.password != this.userFormBuilder.value.rePassword){
        alert('Senhas informadas não conferem!')
      }else{
        this.userService.getUserByEmail(this.userFormBuilder.value.email).subscribe((u:any)=>{
          if(u.length>0){
            alert('E-mail já casdastrado!')
          }else{
            let user = {
              uid:'',
              name: this.userFormBuilder.value.name,
              email: this.userFormBuilder.value.email,
              cpf: this.userFormBuilder.value.cpf,
              password: this.userFormBuilder.value.password,
              phoneNumber: this.userFormBuilder.value.phoneNumber,
              photoUrl: this.userFormBuilder.value.photoUrl,
              location: this.userFormBuilder.value.location,
              points: 0,
              settingsUser: {
                  language: 'pt-br',
                  type: 'client'
              }
            }
            this.register(user);
          }
        })
      }
    }else{
      console.log('not valid')
    }
    
  }

  register(user: User){
    this.authService.register(user).subscribe((u:any)=>{
      delete u.id;
      delete u.password;
      delete u.cpf;
      delete u.phoneNumber;
      delete u.location;
      delete u.settingsUser;
      localStorage.setItem('user',JSON.stringify(u))

      this.authService.logout();

      this.router.navigate(['/login']);
    })
  }

}
