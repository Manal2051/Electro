import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _AuthService = inject(AuthServiceService);
  private _HttpClient = inject(HttpClient);

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor() {}

  private getHeaders(): HttpHeaders {
    const customerId = this._AuthService.userId;
    if (!customerId) throw new Error("User ID is null. User might not be logged in.");
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'customerId': customerId
    });
  }

  refreshCartCount(): void {
    this.getCartItems().subscribe({
      next: (res) => {
        const count = res.model.length;
        this.cartCountSubject.next(count);
      },
      error: (err) => {
        console.error("Error fetching cart items count:", err);
        this.cartCountSubject.next(0);
      }
    });
  }

  addCart(): Observable<any> {
    const headers = this.getHeaders();
    return this._HttpClient.post(`${environment.baseUrl}/Cart/AddCart`, {}, { headers });
  }

  getCarts(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/Cart/Carts`);
  }

  getCartItems(): Observable<any> {
    const headers = this.getHeaders();
    return this._HttpClient.get(`${environment.baseUrl}/CartItem/Items`, { headers });
  }

  addItemToCart(qu: number, id: number): Observable<any> {
    const headers = this.getHeaders();
    const body = { quantity: qu, productId: id };

    return new Observable(observer => {
      this._HttpClient.post(`${environment.baseUrl}/CartItem/AddItem`, body, { headers }).subscribe({
        next: (res) => {
          this.refreshCartCount();
          observer.next(res);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  DeleteItem(id: number): Observable<any> {
    const headers = this.getHeaders();

    return new Observable(observer => {
      this._HttpClient.delete(`${environment.baseUrl}/CartItem?id=${id}`, { headers }).subscribe({
        next: (res) => {
          this.refreshCartCount();
          observer.next(res);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  updateItem(id: number, item: any): Observable<any> {
    const headers = this.getHeaders();

    return new Observable(observer => {
      this._HttpClient.put(`${environment.baseUrl}/CartItem/UpdateItem?id=${id}`, item, { headers }).subscribe({
        next: (res) => {
          this.refreshCartCount();
          observer.next(res);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }
}
