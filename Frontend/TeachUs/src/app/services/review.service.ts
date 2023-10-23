import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type','application/json')
    .set('Authorization', 'Bearer ' + this.cookieService.get('Token'))
  };
  public url ='https://localhost:7278/api/Review'

  constructor(
    public http: HttpClient,
    private cookieService: CookieService,
  ) { }

  public createReview(model: any): Observable<any>{
    return this.http.post<any>(`${this.url}`,model);
  }

  public editReview(id: any, message: string): Observable<any>{
    const headers = { 'content-type': 'application/json'};

    return this.http.patch(`${this.url +"/editReview/"+ id + ", " + message}`, {'headers':headers});
  }

  public getAllStudentReviews(email: string): Observable<any>{
    return this.http.get<any>(`${this.url}/ViewAllStudentReviews/${email}`);
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
}
