import { Component,Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Binary } from '@angular/compiler';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { ResumeService } from 'src/app/services/resume.service';
@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent {
  fileUrl: string = ''; // Holds the file URL
  numberValue: number | null = null; // Holds the number input
public selectedFileName: string = '';
isLoading = false;
  resumeResult: any;
  constructor(private router: Router, 
              private http: HttpClient,
              private resumeService: ResumeService) { }

toggleLoading() {
  this.isLoading = !this.isLoading;
}
  save(): void {
    if (!this.fileUrl || this.numberValue === null) {
      alert('Please enter both the file URL and a number!');
      return;
    }
    this.toggleLoading();
    console.log('Saving parameters...');
    console.log('File URL:', this.fileUrl);
    console.log('Number:', this.numberValue);

    this.resumeService.GetResume(this.numberValue, this.fileUrl).subscribe(
      (response: any) => {
        console.log(this.fileUrl)
        if (response && response.resume) {
          console.log(response)
          this.resumeResult = response.resume;
          console.log('Extracted Resume:', this.resumeResult);
          this.toggleLoading();
        } else {
          console.error('No resume data found in the response');
        }
      },
      (error) => {
        console.error('Error fetching resume:', error);
      }
    );
  }
}


