import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MentorRequestsService } from 'src/app/services/mentor-requests.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-video-page-mentor',
  templateUrl: './video-page-mentor.component.html',
  styleUrls: ['./video-page-mentor.component.scss']
})
export class VideoPageMentorComponent implements OnInit {

  public studentsEmails: string[] = [];
  public emailMentor?: string | null;
  isFormComplete = false;
  public videoAddForm: FormGroup = new FormGroup({
    mentorEmail:new FormControl(''),
    studentEmail:new FormControl(''),
    videoUrl: new FormControl(''),
    youtubeVideoCode: new FormControl(''),
    subject: new FormControl('')
  })

  
  constructor(
    private mentorRequestService: MentorRequestsService,
    private videoService: VideoService
  ) { }

  ngOnInit(): void {
    this.emailMentor = localStorage.getItem("Email") !== null ? localStorage.getItem("Email") : sessionStorage.getItem("Email");

    if (this.emailMentor) {
      this.mentorRequestService.GetAllMatchingStudents(this.emailMentor).subscribe(
        (result: string[]) => {
          this.studentsEmails = result;
        },
        (error) => {
          console.error(error);
        }
      );
    }

    this.videoAddForm.valueChanges.subscribe(() => {
      this.checkFormComplete();
    });
  }
  checkFormComplete() {  
    let complete = true;
    if (!this.videoAddForm.get('studentEmail')?.value ||
        !this.videoAddForm.get('videoUrl')?.value ||
        !this.videoAddForm.get('youtubeVideoCode')?.value ||
        !this.videoAddForm.get('subject')?.value
        ) {
      complete = false;
    } 
    this.isFormComplete = complete;
  }
  public saveDetailsVideo(): void{
    this.videoAddForm.get('mentorEmail')?.setValue(this.emailMentor);
    console.log(this.videoAddForm.get('studentEmail')?.value);
    console.log(this.videoAddForm.get('mentorEmail')?.value);
    console.log(this.videoAddForm.get('videoUrl')?.value);
    console.log(this.videoAddForm.get('youtubeVideoCode')?.value);
    console.log(this.videoAddForm.get('subject')?.value);
    this.videoService.createVideo(this.videoAddForm.value).subscribe(
      (result) => {
        console.log(result);
        location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
  
