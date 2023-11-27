import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { DialogViewMentorReviewsComponent } from 'src/app/components/shared/dialog-view-mentor-reviews/dialog-view-mentor-reviews.component';
import { DialogViewStudentReviewsComponent } from 'src/app/components/shared/dialog-view-student-reviews/dialog-view-student-reviews.component';
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
  public sortByStarsAsc: boolean = true;
  public sortByNameAsc: boolean = true;
 
  constructor(
    private videoService: VideoCallService,
    private reviewService: ReviewService,
    private myStudentService: StudentService,
    private cookie: CookieService,
    private dialog: MatDialog
  ){}
  ngOnInit(): void {

    
    this.emailSt = localStorage.getItem("Email") !== null ? localStorage.getItem("Email") : sessionStorage.getItem("Email");
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
                 for(let mentor of this.mentors){
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
          this.sortByNameASC();
          this.sortByNameAsc = true;
        },
        (error) => {
          console.error(error);
        }
        );
    }
   
  }

  public sortByNameASC() {
    this.sortByNameAsc = true;
    this.mentors.sort((a, b) => {
      return a.username.localeCompare(b.username);
    });
  }
  public sortByNameDESC() {
    this.sortByNameAsc = false;
    this.mentors.sort((a, b) => {
        return b.username.localeCompare(a.username);
    });
  }

  public sortedStarsAscending() {
    this.sortByStarsAsc = true;
    this.mentors.sort((a, b) => {
      return (a.numberOfStars !== undefined? a.numberOfStars : 0) - (b.numberOfStars !== undefined? b.numberOfStars : 0);
    });
  }

  public sortedStarsDescending() {
    this.sortByStarsAsc = false;
    this.mentors.sort((a, b) => {
      return (b.numberOfStars !== undefined? b.numberOfStars : 0) - (a.numberOfStars !== undefined? a.numberOfStars : 0);
    });
  }

  public getMyReviews() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1000px';
    dialogConfig.height = '900px';
  
    const dialog = this.dialog.open(DialogViewMentorReviewsComponent, dialogConfig);
    dialog.afterClosed().subscribe((result) =>{
      if(result){
        this.mentors = result;
      }
    }); 
  }
}



