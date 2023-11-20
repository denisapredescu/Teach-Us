import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MentorsSubjectModel } from 'src/app/models/mentors-subject-model';
import { YoutubeVideoCodeModel } from 'src/app/models/youtube-video-code-model';
import { MentorRequestsService } from 'src/app/services/mentor-requests.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-video-page-student',
  templateUrl: './video-page-student.component.html',
  styleUrls: ['./video-page-student.component.scss']
})
export class VideoPageStudentComponent implements OnInit {

  videoCodesDate: YoutubeVideoCodeModel[] = [];
  mentorsSubject: MentorsSubjectModel[] = [];
  public emailStudent?: string | null;

  public mentorSubjectForm: FormGroup = new FormGroup({
    emailStudent: new FormControl(''),
    emailMentor: new FormControl(''),
    subject: new FormControl('')
  })
  public filteredSubjects: string[] = [];

  constructor(
    private mentorRequestService: MentorRequestsService,
    private videoService: VideoService
  ) { }

  ngOnInit(): void {
    this.emailStudent = localStorage.getItem("Email") !== null ? localStorage.getItem("Email") : sessionStorage.getItem("Email");

    if (this.emailStudent) {
      this.mentorSubjectForm.get('emailStudent')?.setValue(this.emailStudent);
      this.mentorRequestService.GetAllMatchingMentorsSubject(this.emailStudent).subscribe(
        (result: MentorsSubjectModel[]) => {
          this.mentorsSubject = result;
          console.log(this.mentorsSubject);
        },
        (error) => {
          console.error(error);
        }
      );
    }
    this.mentorSubjectForm.get('emailMentor')?.valueChanges.subscribe((selectedMentorEmail) => {
      this.filteredSubjects = this.mentorsSubject.find((mentor) => mentor.emailMentor === selectedMentorEmail)?.subject || [];
    });
    this.mentorSubjectForm.get('subject')?.valueChanges.subscribe(() => {});
  }

  public save(): void{
    this.videoService.GetVideoForStudent(
      this.mentorSubjectForm.get('emailStudent')?.value,
      this.mentorSubjectForm.get('emailMentor')?.value,
      this.mentorSubjectForm.get('subject')?.value).subscribe(
      (result: YoutubeVideoCodeModel[]) => {
        console.log(result);
        this.videoCodesDate=result;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
