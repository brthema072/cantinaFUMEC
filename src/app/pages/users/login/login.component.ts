import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormBuilder = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.clear();
  }

  onLoginFormSubmit(){
    let email = this.loginFormBuilder.value.email;
    let password = this.loginFormBuilder.value.password;

    if(this.loginFormBuilder.valid){
      this.authService.login(email, password).subscribe((res:any)=>{
        
        if(res.length>0){
          if(password == res[0].password){
            delete res[0].id;
            delete res[0].password;
            delete res[0].cpf;
            delete res[0].phoneNumber;
            delete res[0].location;
            delete res[0].settingsUser;

            localStorage.setItem('user', JSON.stringify(res[0]));

            this.router.navigate(['/dashboard']);
            
          }else{
            console.log('erro')
          }
        }else{
          console.log('usuario não cadastrado')
        }
      })
    }
  }
}
