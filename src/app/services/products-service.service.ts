import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  constructor() { }
  baseUrl:string='https://localhost:7154';
   private readonly _HttpClient= inject(HttpClient);
   getAllProduct(pageNumber:Number,pageSize:Number):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/Product/Products?pageNumber=${pageNumber}&pageSize=${pageSize}`);
   }

   getProductByName(name:string|null):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/Product/ProductByName?name=${name}`)
   }
}
