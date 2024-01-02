import { Component, Input } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogAddReviewByStudentComponent } from "../shared/dialog-add-review-by-student/dialog-add-review-by-student.component";
import { Router } from "@angular/router";
import { MentorService } from "src/app/services/mentor.service";
import { StudentModel } from "../../models/student-model";
import { MentorModel } from "src/app/models/mentor-model";
import { DialogAddAssessmentByTeacherComponent } from "../shared/dialog-add-assessment-by-teacher/dialog-add-assessment-by-teacher.component";
import { DialogAddReviewByMentorComponent } from "../shared/dialog-add-review-by-mentor/dialog-add-review-by-mentor.component";
import { CookieService } from "ngx-cookie-service";
import { Location } from '@angular/common'; 
@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent {
  @Input() person: StudentModel | MentorModel;
  @Input() pageToShowOn: string = "";
  @Input() status: boolean;
  public cookieSubject: string | null;
  public email: string | null;
  public emailPersoana: string | null;
  public Ssubject: string | null;
  public varTest: boolean = false; /// to verify if the page is access by a mentor or by the student; in backend I verify if the user is mentor or student to find the number of stars
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private mentorService: MentorService,
    private cookieService: CookieService,
    private location: Location,
  ) {
    this.cookieSubject = "";
  }

  private reloadPage(): void {
    this.location.replaceState(this.location.path());  // This will simulate a replaceState without triggering a navigation
    window.location.reload();
  }
  isArray(subject: any): boolean {
    return Array.isArray(subject);
}
  ngOnInit() {
    this.cookieSubject = localStorage.getItem("matchSubject") !== null ? localStorage.getItem("matchSubject") : sessionStorage.getItem("matchSubject");
  }

  public addReview(person: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    dialogConfig.height = "770px";
    dialogConfig.data = { data: person };
    const dialog = this.dialog.open(
      DialogAddReviewByStudentComponent,
      dialogConfig
    );
    dialog.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

  public addReviewForMentor(person: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    dialogConfig.height = "770px";
    dialogConfig.data = { data: person };
    const dialog = this.dialog.open(
      DialogAddReviewByMentorComponent,
      dialogConfig
    );
    dialog.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

  public addAssessment(person: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    dialogConfig.height = "770px";
    dialogConfig.data = { data: person };
    const dialog = this.dialog.open(
      DialogAddAssessmentByTeacherComponent,
      dialogConfig
    );
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.reloadPage();
        // window.location.reload();
      }
    });
  }
  public viewHomework(person:any){
    this.emailPersoana = person.email;
    localStorage.setItem('EmailPersoana', this.emailPersoana!);
    //localStorage.setItem('EmailSStudent', this.emailSStudent!);
    localStorage.setItem('Subject',  person.subject);
    this.router.navigate([`/homework`]);
   
    
  }


  public chooseMentor(person: any) {
    this.email = localStorage.getItem("Email") !== null ? localStorage.getItem("Email") : sessionStorage.getItem("Email");
    
    if (this.email === "" || this.email === null) {
      this.router.navigate(["/login"]);
    } else {
      console.log("suuubj",this.cookieSubject)
      this.mentorService
        .createNewMatch(person.email, this.email!, this.cookieSubject!)
        .subscribe(result => {
          if (result) {
            alert("The matching request was send!!");
            let rememberMe = localStorage.getItem("rememberMe");

            if (rememberMe === 'true') {
              localStorage.setItem('matchStars', "");
              localStorage.setItem('matchSubject',  "");
              localStorage.setItem('matchCounty', "");
              localStorage.setItem('matchCity', "");
            } else {
              sessionStorage.setItem('matchStars', "");
              sessionStorage.setItem('matchSubject',  "");
              sessionStorage.setItem('matchCounty', "");
              sessionStorage.setItem('matchCity', "");
            }
          }
        });
    }
  }

  public chooseAMentor(person: any, subject: any) {
    this.email = localStorage.getItem("Email") !== null ? localStorage.getItem("Email") : sessionStorage.getItem("Email");
    
    if (this.email === "" || this.email === null) {
      this.router.navigate(["/login"]);
    } else {
      this.mentorService
        .createNewMatch(person.email, this.email!, subject)
        .subscribe(result => {
          if (result) {
            alert("The matching request was send!!");
            let rememberMe = localStorage.getItem("rememberMe");

            if (rememberMe) {
              localStorage.setItem('matchStars', "");
              localStorage.setItem('matchSubject',  "");
              localStorage.setItem('matchCounty', "");
              localStorage.setItem('matchCity', "");
            } else {
              sessionStorage.setItem('matchStars', "");
              sessionStorage.setItem('matchSubject',  "");
              sessionStorage.setItem('matchCounty', "");
              sessionStorage.setItem('matchCity', "");
            }
          }
        });
    }
  }

  public redirectToProfile() {
    this.varTest = true;

    let rememberMe = localStorage.getItem("rememberMe");

    if (rememberMe === 'true') 
      localStorage.setItem("Verificare_User_Profile", this.varTest.toString());
    else 
      sessionStorage.setItem("Verificare_User_Profile", this.varTest.toString());
    
    setTimeout(() => {
      this.router.navigate([`/user-profile/${this.person.email}`]);
    }, 1000);
  }
}
