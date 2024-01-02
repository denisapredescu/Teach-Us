import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AccountModel } from "../models/account-model";
import { RegisterModel } from "../models/register-model";

@Injectable({
  providedIn: "root",
})
export class UserAccountService {
  private url = "https://localhost:7278/api/Accounts";

  constructor(private http: HttpClient) {}
  public Register(user: RegisterModel): Observable<any> {
    const headers = { "content-type": "application/json" };
    // const body=JSON.stringify();
    return this.http.post(`${this.url}/register`, user, { headers: headers });
  }

  public Login(info: any): Observable<any> {
    const headers = { "content-type": "application/json" };
    return this.http.post(`${this.url}/login`, info, { headers: headers });
  }

  public GetAllUsers(): Observable<any> {
    return this.http.get(`${this.url}/GetAllUsers`);
  }

  public GetUserInfo(email: string): Observable<any> {
    return this.http.get(`${this.url}/GetUserInfoByEmail/${email}`);
  }

  public GetUserInfoWithAddressByEmail(email: string, rol: string): Observable<any> {
    return this.http.get(`${this.url}/GetUserInfoWithAddressByEmail/${email}/${rol}`);
  }

  public UpdateUserInfoWithAddressByEmail(email: string, user: AccountModel): Observable<any> {
    return this.http.put(`${this.url}/UpdateUserWithAddressByEmail/${email}`, user);
  }


  public SoftDeleteUserByEmail(email: string): Observable<any> {
    return this.http.put(`${this.url}/SoftDelete`, {email: email});
  }


  public Logout(email: any): Observable<any> {
    const headers = { "content-type": "application/json" };
    return this.http.delete(`${this.url}/DeleteTokenAsync/${email}`);
  }
}
