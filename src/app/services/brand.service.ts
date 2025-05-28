import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { Ibrand } from '../Interfaces/ibrand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  constructor(private _HttpClient: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken') || '';
    console.log('Using token:', token);
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllBrand(): Observable<any> {
    return this._HttpClient.get<any>(
      `${environment.baseUrl}/Brand/Brands`,
      { headers: this.getAuthHeaders() }
    );
  }

  addBrand(brandData: Ibrand): Observable<Ibrand> {
    const headers = this.getAuthHeaders().set('Content-Type', 'application/json');
    return this._HttpClient.post<Ibrand>(
      `${environment.baseUrl}/Brand/AddBrand`,
      brandData,
      { headers: headers }
    );
  }

  deleteBrand(id: number): Observable<void> {
    return this._HttpClient.delete<void>(
      `${environment.baseUrl}/Brand/DeleteBrand/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  getBrandById(id: number): Observable<any> {
    return this._HttpClient.get<any>(
      `${environment.baseUrl}/Brand/BrandById/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

 updateBrand(id: number, brandData: Ibrand): Observable<any> {
    const headers = this.getAuthHeaders().set('Content-Type', 'application/json');
    return this._HttpClient.put<any>(
      `${environment.baseUrl}/Brand/UpdateBrand/${id}`, 
      brandData,
      { headers: headers }
    );
  }
}
