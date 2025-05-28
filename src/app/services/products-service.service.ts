
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
    return new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
  }

  private getMultipartHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    if (!token) {
      throw new Error('No authentication token found');
    }
    // Don't set Content-Type for FormData - let the browser handle it
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllProduct(pageNumber: number, pageSize: number): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseUrl}/Product/Products?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      { headers: this.getAuthHeaders() }
    );
  }

  getProductById(id: number): Observable<IProduct> {
    return this._HttpClient.get<IProduct>(
      `${environment.baseUrl}/Product/ProductById/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  // Main update method with proper FormData structure
  updateProduct(id: number, productData: FormData): Observable<any> {
    console.log(`Calling PUT: ${environment.baseUrl}/Product/EditProduct/${id}`);
    return this._HttpClient.put(
      `${environment.baseUrl}/Product/EditProduct/${id}`,
      productData,
      { headers: this.getMultipartHeaders() }
    );
  }

  // JSON-only update method (without file upload)
  updateProductJson(id: number, productData: any): Observable<any> {
    console.log(`Calling JSON PUT: ${environment.baseUrl}/Product/EditProduct/${id}`);
    console.log('JSON Data:', productData);
    
    return this._HttpClient.put(
      `${environment.baseUrl}/Product/EditProduct/${id}`,
      productData,
      { headers: this.getAuthHeaders() }
    );
  }

  addProduct(product: FormData): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/Product/AddProduct`,
      product,
      { headers: this.getMultipartHeaders() }
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this._HttpClient.delete<void>(
      `${environment.baseUrl}/Product/DeleteProduct/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  getProductByName(name: string): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseUrl}/Product/ProductByName?name=${name}`,
      { headers: this.getAuthHeaders() }
    );
  }

  GetProductByCategoryName(name: string | null): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseUrl}/Product/ProductByCategoryName?name=${name}`,
      { headers: this.getAuthHeaders() }
    );
  }

  GetProductByBrandName(name: string | null): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseUrl}/Product/ProductByBrandName?name=${name}`,
      { headers: this.getAuthHeaders() }
    );
  }
}
