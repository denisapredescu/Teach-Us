import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MentorRequestsService {
  private url = 'https://localhost:7278/api/Matching/';
  
  constructor(
    private http: HttpClient,
  ) { }


  public GetUserRequests(email :string) : Observable<any>{
    return this.http.get(`${this.url + 'ViewMentorWaitingRequests/' + email}`);
  }

  public GetAllRequests(email :string) : Observable<any>{
    return this.http.get(`${this.url + 'AllRequests/' + email}`);
  }

  public ChangeRequestStatus(emailMentor :string, studentEmail: string, status: boolean, subject: string) : Observable<any>{
    const headers = { 'content-type': 'application/json'};
    return this.http.patch(`${this.url + 'RespondToRequests/' + emailMentor + ", " + studentEmail + ", " + status + "/"+ subject}`, {'headers':headers});
  }

  public GetAllMatchingStudents(mentorEmail : string) : Observable<any>{
    return this.http.get(`${this.url + 'MatchedStudent/' + mentorEmail}`);
  }

  public GetAllMatchingMentorsSubject(studentEmail : string) : Observable<any>{
    return this.http.get(`${this.url + 'MatchedTeachersSubject/' + studentEmail}`);
  }
}
