import { Component } from '@angular/core';
import { MentorModel } from 'src/app/models/mentor-model';
import { MentorService } from 'src/app/services/mentor.service';

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.scss']
})
export class MentorsComponent {
  public emailSt?: string;
  public mentors: MentorModel[] = [];
  public matchStatus: boolean = false;
  constructor(
    private mentorsService: MentorService,
  ){}

  ngOnInit(): void {
    this.mentorsService.getAllMentors().subscribe(
      (result: MentorModel[]) => {
        this.mentors = result;
        console.log(this.mentors); 
      },
      (error) => {
        console.error(error);
      }
    );
  }
}