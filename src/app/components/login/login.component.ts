import { AuthServiceService } from './../../services/auth-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {  HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  private readonly _formbuilder=inject(FormBuilder);
  private readonly _router=inject(Router);
  private readonly _AuthService=inject(AuthServiceService);

   isLoding:boolean=false;
    msgErro:string="";

  loginForm:FormGroup=this._formbuilder.group({
    email:[null,[Validators.required]],
    password:[null,[Validators.required]]
  })


  loginSubmit():void{
    if(this.loginForm.valid)
    {
      this._AuthService.setLoginForm(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.isSucceeded)
          {
            // console.log(res.model.token);
            setTimeout(()=>{
              localStorage.setItem('userToken',res.model.token);
             //2-decode token and as we use it in many place we do it in service
              this._AuthService.saveUserData();

              this._router.navigate(['/home'])
            },1000);

          }
          this.isLoding=false;


        },
        error:(err:HttpErrorResponse)=>{
          this.msgErro=err.error.message
          console.log(err);
          this.isLoding=false;
        }
      })
    }
  }
}
