import { AuthServiceService } from './../../services/auth-service.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly _formbuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _AuthService = inject(AuthServiceService);

  isLoding: boolean = false;
  msgErro: string = '';

  loginForm: FormGroup = this._formbuilder.group({
    email: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  loginSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoding = true;
      this._AuthService.setLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.isSucceeded) {
            setTimeout(() => {
              if (typeof window !== 'undefined') {
                localStorage.setItem('userToken', res.model.token);
              }
              this._AuthService.saveUserData();
              const role =
                this._AuthService.userData?.[
                  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
                ];
              if (role === 'Admin') {
                this._router.navigate(['/dashboard']);
              } else {
                this._router.navigate(['/home']);
              }
            });
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

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  goToRegister() {
    this._router.navigate(['/register']);
  }
}
