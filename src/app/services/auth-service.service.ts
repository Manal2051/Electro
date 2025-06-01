import { jwtDecode } from 'jwt-decode';
import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private _HttpClient = inject(HttpClient);
  private _Router = inject(Router);

  userData: any;
  userId: string | null = null;

  getCustomerId() {
    throw new Error('Method not implemented.');
  }

  // Interceptor for attaching token
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.getToken();
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
    return next.handle(req);
  }

  setRegisterationForm(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/Account/Register`,
      data
    );
  }

  setLoginForm(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/Account/Login`, data);
  }

  // Save userData if token is found
  saveUserData(): void {
    if (
      typeof window !== 'undefined' &&
      localStorage.getItem('userToken') !== null
    ) {
      const token = localStorage.getItem('userToken')!;
      this.userData = jwtDecode(token);
      this.userId =
        this.userData[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ];
      console.log('userData', this.userData);
      console.log('userId', this.userId);
    }
  }

  // Sign out the user
  sinOut(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userToken');
    }
    this.userData = null;
    this._Router.navigate(['/login']);
  }

  getToken(): string | null {
    return typeof window !== 'undefined'
      ? localStorage.getItem('userToken')
      : null;
  }
}
