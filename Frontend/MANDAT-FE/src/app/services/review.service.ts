import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  token = localStorage.getItem("Token") !== null ? localStorage.getItem("Email") : sessionStorage.getItem("Email");;
  
  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type','application/json')
    .set('Authorization', 'Bearer ' + this.token)
  };
  public url ='https://localhost:7278/api/Review'

  constructor(
    public http: HttpClient,
  ) { }

  public createReview(model: any): Observable<any>{
    return this.http.post<any>(`${this.url}`,model);
  }

  public editReview(id: any, message: string): Observable<any>{
    const headers = { 'content-type': 'application/json'};

    return this.http.patch(`${this.url +"/editReview/"+ id + ", " + message}`, {'headers':headers});
  }

  public deleteReview(id: any): Observable<any> {
    return this.http.delete(`${this.url}?id=${id}`);
  }

  public getAllMentorReviews(email: string): Observable<any>{
    return this.http.get<any>(`${this.url}/ViewAllMentorReviews/${email}`);
  }

  public getMentorsStars(email: string): Observable<any>{
    return this.http.get<any>(`${this.url}/MentorStars/${email}`);
  }

  public getStudentStars(email: string): Observable<any>{
    return this.http.get<any>(`${this.url}/StudentStars/${email}`);
  }

  public getAllStudentReviews(email: string): Observable<any>{
    return this.http.get<any>(`${this.url}/ViewAllStudentReviews/${email}`);
  }
}
