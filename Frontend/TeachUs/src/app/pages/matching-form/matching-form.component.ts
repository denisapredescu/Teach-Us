import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MatchingFormModel } from 'src/app/models/matching-form-model';
import { subjects } from 'src/app/constants/subjects';

@Component({
  selector: "app-matching-form",
  templateUrl: "./matching-form.component.html",
  styleUrls: ["./matching-form.component.scss"],
  
})
export class MatchingFormComponent implements OnInit {
  ngOnInit(): void {}

  constructor(
    public cookieService: CookieService,
    public router: Router
  ){}

  subjects: string[] = subjects;
  meetingTypes: string[] = ["Online", "Face-To-Face"];
  stars: number = 0;
  
  public model: MatchingFormModel = {
    county: "",
    subjects: "",
    city: "",
    meetingType: "",
    stars: 0,
  };

  onStarsChanged(newValue: number) {
    console.log(`Stars selected: ${newValue}`);
    this.stars = newValue;
  }
  
  public match(): void {

    this.cookieService.set('matchCity', this.model.city);
    this.cookieService.set('matchCounty', this.model.county);
    this.cookieService.set('matchSubject', this.model.subjects);
    this.cookieService.set('matchMeeting', this.model.meetingType);
    this.cookieService.set('matchStars', this.stars.toString());
    this.router.navigate(["/mentors"]);
  }

}