import { Component, Input } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogAddReviewByStudentComponent } from "../shared/dialog-add-review-by-student/dialog-add-review-by-student.component";
import { Router } from "@angular/router";
import { MentorService } from "src/app/services/mentor.service";
import { StudentModel } from "../../models/student-model";
import { MentorModel } from "src/app/models/mentor-model";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent {
  @Input() person: StudentModel | MentorModel;
  @Input() pageToShowOn: string = "";
  @Input() status: boolean;
  public cookieSubject: string;
  public varTest: boolean = false; /// to verify if the page is access by a mentor or by the student; in backend I verify if the user is mentor or student to find the number of stars
  constructor(
    private dialog: MatDialog,
    private cookie: CookieService,
    private router: Router,
    private mentorService: MentorService
  ) {
    this.cookieSubject = "";
  }
  isArray(subject: any): boolean {
    return Array.isArray(subject);
}
  ngOnInit() {
    console.log("in card ", this.person);
    this.cookieSubject = this.cookie.get("matchSubject");
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

  public chooseMentor(person: any) {
    let email = this.cookie.get("Email");
    if (email === "") {
      this.router.navigate(["/login"]);
    } else {
      this.mentorService
        .createNewMatch(person.email, email, this.cookieSubject)
        .subscribe(result => {
          if (result) {
            alert("The matching request was send!!");
            console.log(result);
            this.cookie.set('matchStars', "");
            this.cookie.set('matchSubject',  "");
            this.cookie.set('matchCounty', "");
            this.cookie.set('matchCity', "");
          }
        });
    }
  }

  public chooseAMentor(person: any, subject: any) {
    let email = this.cookie.get("Email");
    if (email === "") {
      this.router.navigate(["/login"]);
    } else {
      this.mentorService
        .createNewMatch(person.email, email, subject)
        .subscribe(result => {
          if (result) {
            alert("The matching request was send!!");
            console.log(result);
            this.cookie.set('matchStars', "");
            this.cookie.set('matchSubject',  "");
            this.cookie.set('matchCounty', "");
            this.cookie.set('matchCity', "");
          }
        });
    }
  }

  public redirectToProfile() {
    this.varTest = true;
    this.cookie.set("Verificare_User_Profile", this.varTest.toString());
    setTimeout(() =>{this.router.navigate([`/user-profile/${this.person.email}`]);}, 1000);
  }
}
