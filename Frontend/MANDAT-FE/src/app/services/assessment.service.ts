import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  token = localStorage.getItem("Token") !== null ? localStorage.getItem("Token") : sessionStorage.getItem("Token");
  
  httpOptions = {
    headers: {
      'Authorization': 'Bearer ' + this.token
    }
  };

  public url = 'https://localhost:7278/api/Assessments';

  constructor(
    public http: HttpClient,
  ) { }

  public createAssessment(model: FormData): Observable<any> {
    return this.http.post<any>(this.url, model, this.httpOptions);
  }
}
