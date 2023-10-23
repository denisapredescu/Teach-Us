import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MentorRequestsService {
private url = 'https://localhost:7278/api/Matching/ViewMentorWaitingRequests/';
private url1 = 'https://localhost:7278/api/Matching/RespondToRequests/';
constructor(
  private http: HttpClient,

) { }


public GetUserRequests(email :string) : Observable<any>{
    
  return this.http.get(`${this.url + email}`);
}

public ChangeRequestStatus(emailMentor :string, studentEmail: string, status: boolean, subject: string) : Observable<any>{
  const headers = { 'content-type': 'application/json'};
  return this.http.patch(`${this.url1 + emailMentor + ", " + studentEmail + ", " + status + "/"+ subject}`, {'headers':headers});
}
}
