import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/model/user.model';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user: User = null;


  users: User[] = [{
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
  }];

  userFormBuilder  = this.fb.group({
    id: [''],
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

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit() {
    /* const user = JSON.parse(localStorage.getItem('user')) */

    this.userService.users().subscribe((users:any)=>{
      if(users.length>0){
        this.users = users;
      }
    })
  }

  editUser(user: User){
    this.user = user;

    this.userFormBuilder.setValue({
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      password: '',
      rePassword: '',
      phoneNumber: user.phoneNumber,
      photoUrl: user.photoUrl,
      location: user.location,
      points: user.points
    })
  }

  removeUser(user: User){
    this.userService.removUser(user).subscribe(()=>{
      alert('Usuário removido com sucess!');
    })
  }

  onPutUserFormSubmit(){
    if(this.userFormBuilder.valid){
      if(this.userFormBuilder.value.password != this.userFormBuilder.value.rePassword){
        alert('Senhas informadas não conferem');
      }else{

        this.userService.getUserByEmail(this.userFormBuilder.value.email).subscribe((u:any)=>{
          if(u.length>0){
            alert('E-mail já casdastrado!')
          }else{
            if(this.user !=null){
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
              this.edit(user);
            }else{
              alert('Usuário não informado!')
            }
          }
        })
        
      }
    }
  }

  edit(user: User){
    this.userService.putUser(user).subscribe(()=>{
      alert('Usuário alterado com sucesso')
    })
  }

}
