import { Component, OnInit } from '@angular/core';
import { LinksModel } from 'src/app/models/links-model';
import { MentorModel } from 'src/app/models/mentor-model';
import { ReviewService } from 'src/app/services/review.service';
import { StudentService } from 'src/app/services/student.service';
import { VideoCallService } from 'src/app/services/video-call.service';

@Component({
  selector: 'app-my-mentors',
  templateUrl: './my-mentors.component.html',
  styleUrls: ['./my-mentors.component.scss']
})

export class MyMentorsComponent implements OnInit{
  public emailSt?: string | null;
  public mentors: MentorModel[] = [];
  public links: LinksModel[] = [];
  public linksNew: Array<[string,string]> = [];
  constructor(
    private videoService: VideoCallService,
    private reviewService: ReviewService,
    private myStudentService: StudentService,
  ){}
  ngOnInit(): void {
    this.emailSt = localStorage.getItem("Email") !== '' ? localStorage.getItem("Email") : sessionStorage.getItem("Email");;
    
    if(this.emailSt){
      this.myStudentService.getMentorsForStudent(this.emailSt).subscribe(
        (result: MentorModel[]) =>{
          this.mentors = result;
            for(let mentor of this.mentors)
            {
              this.reviewService.getMentorsStars(mentor.email).subscribe(
                (result:number) => {
                  mentor.numberOfStars = result;
                },
                (error) => {
                  console.error(error);
                }
                );
            }
            if(this.emailSt!=null)
            {
              this.videoService.getLinkByStudent(this.emailSt).subscribe(
                (result1:LinksModel[]) =>{
                  this.links = result1; 

                  for(let mentor of this.mentors)
                  {
                    for(let oneLink of this.links)
                    {
                      if(oneLink.mentorEmail == mentor.email){
                        this.linksNew.push([oneLink.link,mentor.email]);
                        mentor.link = oneLink.link;        
                        break;
                      }
                      else{
                        this.linksNew.push(["",mentor.email]);
                        mentor.link = "";
                      }
                    }
                  }
                },
                (error) => {
                  console.error(error);
                });
              }
        },
        (error) => {
          console.error(error);
        });
    }
  }
}




