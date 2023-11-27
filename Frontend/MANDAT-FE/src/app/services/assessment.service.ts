import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  token = localStorage.getItem("Token") !== null ? localStorage.getItem("Token") : sessionStorage.getItem("Token");

  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type','application/json')
    .set('Authorization', 'Bearer ' + this.token)
  };

  public url = 'https://localhost:7278/api/Assessments';

  constructor(
    public http: HttpClient,
  ) { }

  public createAssessment(model: any): Observable<any> {
    return this.http.post<any>(`${this.url}`, model);
  }

  public getStudentAssignment(studentEmail: string, mentorEmail: string, subject: string): Observable<any>{
    return this.http.get<any>(`${this.url}/GetAssessmentByStudentTeacher/${studentEmail}, ${mentorEmail}, ${subject}`);
  }

  // public addDoneAssessment(assessmentId: Guid, studentPdf: any): Observable<any>{
  //   const formData = new FormData();
  //   formData.append('assessmentId', assessmentId);
  //   formData.append('studentPdf', studentPdf);
  //   return this.http.patch(`${this.url}/addDoneAssessment`, formData);
  // }
  public addDoneAssessment(assessmentId: Guid, studentPdf: any): Observable<any> {
    const formData = new FormData();
    formData.append('assessmentId', assessmentId.toString()); // Convert to string here
    formData.append('studentPdf', studentPdf);
  
    return this.http.patch(`${this.url}/addDoneAssessment`, formData);
  }
  
  public checkAssessment(assessmentId: Guid, check: boolean): Observable<any> {
    const formData = new FormData();
    formData.append('assessmentId', assessmentId.toString()); // Convert to string here
    formData.append('check', check.toString());
  
    return this.http.patch(`${this.url}/checkAssessment`, formData);
  }

}
