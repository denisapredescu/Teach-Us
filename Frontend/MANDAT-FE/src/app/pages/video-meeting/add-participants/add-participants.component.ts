import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MyErrorStateMatcher } from "src/app/components/account-form/account-form.component";
import { MeetingModel } from "src/app/models/meeting-model";
import { VideoCallService } from "src/app/services/video-call.service";

@Component({
  selector: "app-add-participants",
  templateUrl: "./add-participants.component.html",
  styleUrls: ["./add-participants.component.scss"],
})
export class AddParticipantsComponent {
  public email: string | null; //localStorage.getItem("Email") !== null ? localStorage.getItem("Email") : sessionStorage.getItem("Email");
  public model: MeetingModel;

  matcher = new MyErrorStateMatcher();
  rememberMe: String | null = "false" ;

  constructor(
    private videocallService: VideoCallService,
  ) {}
  
  ngOnInit() {
    this.email = localStorage.getItem("Email") !== null ? localStorage.getItem("Email") : sessionStorage.getItem("Email");
    this.rememberMe = localStorage.getItem("rememberMe") !== null ? localStorage.getItem("rememberMe") : sessionStorage.getItem("rememberMe");; 
    this.model = {
      link: "",
      studentEmail: "",
      mentorEmail: this.email !== null ? this.email : ''
    };
  }

  public Send(): void {
    this.videocallService.CreateOrUpdateLink(this.model).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );

    if (this.rememberMe === 'false') {
      sessionStorage.setItem("Student Email", this.model.studentEmail);
      sessionStorage.setItem("Link", this.model.link.toString());
    } else {
      localStorage.setItem("Student Email", this.model.studentEmail);
      localStorage.setItem("Link", this.model.link.toString());
    }
  }
}
