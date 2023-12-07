import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MeetingModel } from "../models/meeting-model";
import { MeetingLink } from "../models/meeting-link";

@Injectable({
  providedIn: "root",
})
export class VideoCallService {
  private url = "https://localhost:7278/api/VideoCall";
  constructor(public http: HttpClient) {}

  public CreateOrUpdateLink(model: MeetingModel): Observable<MeetingLink> {
    //const headers = { 'content-type': 'application/json'};
    return this.http.post<MeetingLink>(`${this.url}`, model); //{'headers':headers});
  }
  public getLinkByStudent(email: String) {
    return this.http.get<any>(`${this.url}/GetStudentVideoCallInfo/${email}`);
  }
}
