import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  token = localStorage.getItem("Token") !== null ? localStorage.getItem("Email") : sessionStorage.getItem("Email");;
  
  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type','application/json')
    .set('Authorization', 'Bearer ' + this.token)
  };
  public url ='https://localhost:7278/api/Accounts'

  constructor(
    public http: HttpClient,
  ) { }

  public getGuidByEmail(email: string): Observable<any>{
    return this.http.get<any>(`${this.url}/userGuid/${email}`);
  }
}
