import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestModel } from 'src/app/models/request-model';
import { MentorRequestsService } from 'src/app/services/mentor-requests.service';

@Component({
  selector: 'app-mentor-requests',
  templateUrl: './mentor-requests.component.html',
  styleUrls: ['./mentor-requests.component.scss']
})

export class MentorRequestsComponent {
  requests: RequestModel[] = [];
  result = [];
  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private mentorRequests: MentorRequestsService,
  ) { }

  ngOnInit(): void {  
    this.changeDetectorRef.detectChanges();   
    var email = localStorage.getItem("Email") !== null ? localStorage.getItem("Email") : sessionStorage.getItem("Email");;
    
    if (email !== '' && email !== null) {
      this.mentorRequests.GetUserRequests(email).forEach(
        (result)=> {
          this.requests = result;   
          this.changeDetectorRef.detectChanges();   
        });
    }
  }
  
  acceptStudent(data: string, sub: string) : void{
    var email = localStorage.getItem("Email") !== null ? localStorage.getItem("Email") : sessionStorage.getItem("Email");;
  
    if (email !== '' && email !== null) {
      this.mentorRequests.ChangeRequestStatus(email, data, true, sub).subscribe(
        (result) => {
            const  div =  document.getElementById(data);
            div!!.remove();
        }
      );
    }
  }

  rejectStudent(data: string, sub: string) : void{
    var email = localStorage.getItem("Email") !== null ? localStorage.getItem("Email") : sessionStorage.getItem("Email");;
    
    if (email !== '' && email !== null) {
      this.mentorRequests.ChangeRequestStatus(email, data, false, sub).subscribe(
        (result) => {
            const  div =  document.getElementById(data);
            div!!.remove();
        }
      );
    }
  }
}