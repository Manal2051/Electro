import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
_AuthService=inject(AuthServiceService);
  constructor(private _HttpClient:HttpClient) { }
myHeader:any=this._AuthService.userId;
private cartCountSubject = new BehaviorSubject<number>(0);

cartCount$ = this.cartCountSubject.asObservable();

addCart():Observable<any>{
    const customerId: any = this._AuthService.userId;
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'customerId': customerId
  });
    return this._HttpClient.post(`${environment.baseUrl}/Cart/AddCart`, { headers });

}
getCarts():Observable<any>{
  return this._HttpClient.get(`${environment.baseUrl}/Cart/Carts`);
}
addItemToCart(qu:number,id:number):Observable<any>{
   const body = {quantity:qu , productId:id };
    const customerId = this._AuthService.userId;
     if (!customerId) {
   throw new Error("User ID is null. User might not be logged in.");
  }


    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'customerId': customerId
  });

  return this._HttpClient.post(`${environment.baseUrl}/CartItem/AddItem`,body,{headers})
}
getCartItems(): Observable<any> {
  const customerId = this._AuthService.userId;
  if (!customerId) {
    throw new Error("User ID is null. User might not be logged in.");
  }

  const headers = new HttpHeaders({
    'customerId': customerId
  });

  return this._HttpClient.get(`${environment.baseUrl}/CartItem/Items`, { headers });
}
DeleteItem(id: number): Observable<any> {
 const customerId = this._AuthService.userId;
  if (!customerId) {
    throw new Error("User ID is null. User might not be logged in.");
  }

  const headers = new HttpHeaders({
    'customerId': customerId
  });

  return this._HttpClient.delete(`${environment.baseUrl}/CartItem?id=${id}`, { headers });
}

updateItem(id: number, item: any): Observable<any> {
  const customerId = this._AuthService.userId;
  if (!customerId) {
    throw new Error("User ID is null. User might not be logged in.");
  }

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'customerId': customerId
  });

  return this._HttpClient.put(`${environment.baseUrl}/CartItem/UpdateItem?id=${id}`, item, { headers });
}



 }
