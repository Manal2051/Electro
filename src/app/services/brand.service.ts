import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { Ibrand } from '../Interfaces/ibrand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {


  private getAuthHeaders(): HttpHeaders
   {
    const token = localStorage.getItem('userToken') || '';
     console.log('Using token:', token)
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

 constructor(private _HttpClient:HttpClient) { }

    getAllBrand():Observable<any>{
      return this._HttpClient.get<any>(`${environment.baseUrl}/Brand/Brands`);
  
    }



  addBrand(brandData: Ibrand): Observable<Ibrand> {
  const headers = this.getAuthHeaders().set('Content-Type', 'application/json');
  return this._HttpClient.post<Ibrand>(`${environment.baseUrl}/Brand/AddBrand`,brandData,{ headers: headers });
}

  

  deleteBrand(id: number): Observable<void> {
    return this._HttpClient.delete<void>(`${environment.baseUrl}/Brand/DeleteBrand/${id}`, { headers: this.getAuthHeaders() });
  }




}
