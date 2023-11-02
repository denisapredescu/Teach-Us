import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  token = localStorage.getItem("Token") !== '' ? localStorage.getItem("Email") : sessionStorage.getItem("Email");;
  url = "https://localhost:7278/api/Student";

  private getHttpOptions(body: any) {
    return {
      headers: new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + this.token),
      body: body,
    };
  }

  constructor(public http: HttpClient) {}

  public getAllStudents(): Observable<any> {
    return this.http.get<any>(`${this.url}/GetAllStudents`);
  }

  public getStudentByEmail(email: String): Observable<any> {
    return this.http.get<any>(`${this.url}/GetStudentByEmail/${email}`);
  }

  public getStudentByName(username: String): Observable<any> {
    return this.http.get<any>(`${this.url}/GetStudentByName/${username}`);
  }

  public getStudentByLocation(locationId: any): Observable<any> {
    return this.http.get<any>(
      `${this.url}/GetStudentsByLocation/${locationId}`
    );
  }

  public getMentorsForStudent(email: String): Observable<any> {
    return this.http.get<any>(`${this.url}/GetMentorsForStudent/${email}`);
  }

  public getMentorPhoneNumber(
    studentEmail: String,
    mentorEmail: String
  ): Observable<any> {
    return this.http.get<any>(
      `${this.url}/GetMentorPhoneNumber/${studentEmail}/${mentorEmail}`
    );
  }

  public updateStudent(email: String, student: any): Observable<any> {
    const options = this.getHttpOptions(student);
    return this.http.put<any>(`${this.url}/UpdateStudent/${email}`, student);
  }

  public SoftDelete(email: String, student: any): Observable<any> {
    const options = this.getHttpOptions(email);
    return this.http.patch<any>(`${this.url}/SoftDelete/${email}`, student);
  }
}
