import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateVideoModel } from '../models/createVideoModel';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private url = 'https://localhost:7278/api/Video/';
  
  constructor(
    private http: HttpClient,
  ) { }

  public createVideo(model: CreateVideoModel): Observable<any>{
    return this.http.post<any>(`${this.url}`,model);
  }

  public GetVideoForStudent(studentEmail: string, mentorEmail: string, subject:string) : Observable<any>{
    return this.http.get(`${this.url + 'VideoForStudent/' + studentEmail + ", " + mentorEmail + " " + subject}`)
  }
}
