import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../Interfaces/iproduct';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {


   private readonly _HttpClient = inject(HttpClient);

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }


  getAllProduct(pageNumber: number, pageSize: number): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseUrl}/Product/Products?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      { headers: this.getAuthHeaders() }
    );
  }

  getProductById(id: string): Observable<IProduct> {
    return this._HttpClient.get<IProduct>(
      `${environment.baseUrl}/Product/ProductById/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }



  getProductByName(name: string ): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseUrl}/Product/ProductByName?name=${name}`,
      { headers: this.getAuthHeaders() }
    );
  }

  addProduct(product: FormData): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/Product/AddProduct`,
      product,
      { headers: this.getAuthHeaders() }
    );
  }

  updateProduct( productData: any): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseUrl}/Product/EditProduct`,
      productData,
      { headers: this.getAuthHeaders() }
    );
  }



  deleteProduct(id: number): Observable<void> {
    return this._HttpClient.delete<void>(
      `${environment.baseUrl}/Product/DeleteProduct/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

 

   
   GetProductByCategoryName(name:string|null):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/Product/ProductByCategoryName?name=${name}`);
   }
   GetProductByBrandName(name:string|null):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/Product/ProductByBrandName?name=${name}`);
   }
}
