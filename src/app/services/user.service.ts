import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(private _HttpClient:HttpClient) { }

     private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken') || '';
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }


  getAllUsers(): Observable<any> {
    return this._HttpClient.get<any>(
      `${environment.baseUrl}/Admin/Users`,
      { headers: this.getAuthHeaders() }
    );
  }

  
}
