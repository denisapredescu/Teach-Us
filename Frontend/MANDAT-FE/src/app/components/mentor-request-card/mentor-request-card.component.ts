import { Component, Input, Output } from '@angular/core';
import { RequestModel } from 'src/app/models/request-model';

@Component({
  selector: 'app-mentor-request-card',
  templateUrl: './mentor-request-card.component.html',
  styleUrls: ['./mentor-request-card.component.scss']
})
export class MentorRequestCardComponent {
  @Input() request: RequestModel[] = [];
  public model: RequestModel = {
    fullName: '',
    email: '',
    matchDate: '',
    status: 'Waiting',
    subject: ''
  }

  ngOnInit(): void {
    this.request.forEach(element => {
      console.log(element.email);
    });
  }
}
