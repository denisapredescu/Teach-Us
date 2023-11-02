import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { subjects } from "src/app/constants/subjects";
import { AnnouncementModel } from "src/app/models/announcement-model";
import { AnnouncementService } from "src/app/services/announcement.service";

@Component({
  selector: "app-create-announcement",
  templateUrl: "./create-announcement.component.html",
  styleUrls: ["./create-announcement.component.scss"],
})
export class CreateAnnouncementComponent {
  public model: AnnouncementModel = {
    id: "",
    email: "",
    subject: "",
    description: "",
    price: 0,
    meetingType: true,
  };

  meetingTypes: string[] = ["Online", "Face-to-Face"];
  selectedMeetingType: string = ""; 
  subjects: string[] = subjects;

  constructor(
    private router: Router,
    private announcementService: AnnouncementService,
  ) {
    let email = localStorage.getItem("Email") !== null ? localStorage.getItem("Email") : sessionStorage.getItem("Email");
    this.model.email = email !== null ? email : '';
  }

  public post(): void {
    if(this.model.subject === ""){
      alert("Please choose a subject!");
      return;
    }
    if(this.model.price <= 0){
      alert("Price cannot be less than or equal than 0.")
      return;
    }
    if(this.selectedMeetingType == ""){
      alert("Please choose a meeting type!");
      return;
    }
    this.model.meetingType = this.selectedMeetingType === "Online" ? true : false;
    this.announcementService.CreateAnnouncementWithEmail(this.model).subscribe(
      result => {
        console.log(result);
        this.router.navigate(["/home"]);
      },
      error => {
        console.log(error);
      }
    );
  }
}
