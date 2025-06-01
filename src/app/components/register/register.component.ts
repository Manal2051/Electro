import { Component, inject, OnDestroy, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule], //ReactiveFormsModule
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy {
  private readonly _formbuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _AuthService = inject(AuthServiceService);
  isLoding: boolean = false;
  msgErro: string = '';
  registerSub!: Subscription;

  registerForm = this._formbuilder.group(
    {
      firstName: [null, [Validators.required, Validators.minLength(3)]],
      lastName: [null, [Validators.required, Validators.minLength(3)]],
      userName: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmNewPassword: [null],
    },
    { validators: this.matchPasswords('password', 'confirmNewPassword') }
  );

  // registerForm=new FormGroup({
  // email:new FormControl(null,[Validators.required,Validators.minLength(3)]),
  // password:new FormControl(null,[Validators.required])
  // })
  RegisterSubmit(): void {
    if (this.registerForm.valid) {
      this.registerSub = this._AuthService
        .setRegisterationForm(this.registerForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.isSucceeded) {
              // this.msgSuccess=true;
              setTimeout(() => {
                this._router.navigate(['/login']);
              }, 100);
            }
            this.isLoding = false;
          },
          error: (err: HttpErrorResponse) => {
            this.msgErro = err.error.message;
            console.log(err);
            this.isLoding = false;
          },
        });
    }
  }
  ngOnDestroy(): void {
    this.registerSub?.unsubscribe();
  }
  matchPasswords(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (
        confirmPasswordControl?.errors &&
        !confirmPasswordControl.errors['passwordMismatch']
      ) {
        return;
      }

      if (passwordControl?.value !== confirmPasswordControl?.value) {
        confirmPasswordControl?.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl?.setErrors(null);
      }
    };
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get userName() {
    return this.registerForm.get('userName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmNewPassword() {
    return this.registerForm.get('confirmNewPassword');
  }

  goToLogin() {
    this._router.navigate(['/login']);
  }

  //   //to navigate to login

  //  // this._router.navigate(['/login'])
}
