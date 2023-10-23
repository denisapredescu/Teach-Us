import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type','application/json')
    .set('Authorization', 'Bearer ' + this.cookieService.get('Token'))
  };
  public url ='https://localhost:7278/api/Accounts'

  constructor(
    public http: HttpClient,
    private cookieService: CookieService,
  ) { }

  public getGuidByEmail(email: string): Observable<any>{
    return this.http.get<any>(`${this.url}/userGuid/${email}`);
  }
}
