import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateVideoModel } from '../models/createVideoModel';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  private url = 'http://127.0.0.1:5000/resume/';
  constructor(
    private http: HttpClient,
  ) { }

  public GetResume(summary_percent: number, path: string) : Observable<any>{
    const encodedPath = encodeURIComponent(path)
    console.log(encodedPath);
    return this.http.get(`${this.url}${summary_percent}/${encodedPath}`);
    
  }
}
