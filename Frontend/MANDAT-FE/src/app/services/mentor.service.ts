import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MentorService {
  token = localStorage.getItem("Token") !== null ? localStorage.getItem("Email") : sessionStorage.getItem("Email");;
  
  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type','application/json')
    .set('Authorization', 'Bearer ' + this.token)
  };

  public url ='https://localhost:7278/api/Mentor';
  private url1 = 'https://localhost:7278/api/Matching/CreateMatch/';

  constructor(
    public http: HttpClient,
  ) { }

  public getAllMentors(): Observable<any>{
    return this.http.get<any>(`${this.url}/mentors`);
  }

  public getMentorByEmailMentorAdminView(email: String){
    return this.http.get<any>(`${this.url}/byEmailViewMentAdm/${email}`);
  }

  public getMentorByEmailStudView(email: String){
    return this.http.get<any>(`${this.url}/byEmailViewStud/${email}`);
  }

  public getMentorByHisName(name: String){
    return this.http.get<any>(`${this.url}/byName/${name}`)
  }

  public getMentorsByTheLocation(locationId: any){
    return this.http.get<any>(`${this.url}/byIdLocation/${locationId}`)
  }

  public getMentorsByLocations(): Observable<any>{
    return this.http.get<any>(`${this.url}/mentorsLocations`);
  }

  public getMyStudents(email:String): Observable<any> {
    return this.http.get<any>(`${this.url}/studentsByEmailMentor/${email}`);
  }

  public updateMentor(email: String, model:any): Observable<any>{
    return this.http.put(`${this.url}/mentorUpdate/${email}`,model);
  }

  public updateMentorItems(email: String, model:any): Observable<any>{
    return this.http.put(`${this.url}/mentorItems/${email}`,model);
  }

  public editReview(email: string, isDeleted: boolean): Observable<any>{
    return this.http.patch(`${this.url}/mentorDelete/${email}`,isDeleted);
  }

  public createNewMatch(emailMentor: string, emailStudent: string, subject: string): Observable<any>{
    const headers = { 'content-type': 'application/json'};
    return this.http.post(`${this.url1}${emailMentor}/${emailStudent}/${subject}`, {'headers':headers});
  }
}
