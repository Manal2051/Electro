import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../Interfaces/icategory';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  
 
  private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('userToken') || '';
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }


  constructor(private _HttpClient:HttpClient) { }

  getAllCategory():Observable<any>{
    return this._HttpClient.get<any>(`${environment.baseUrl}/Category/Categories`);

  }

 
addCategory(categoryData: FormData): Observable<ICategory> {
  return this._HttpClient.post<ICategory>(`${environment.baseUrl}/Category/AddCategory`,categoryData,{ headers: this.getAuthHeaders() });
}

    deleteCategory(id: number): Observable<void> {
    return this._HttpClient.delete<void>(`${environment.baseUrl}/Category/DeleteCategory/${id}`, { headers: this.getAuthHeaders() });
  }





}
