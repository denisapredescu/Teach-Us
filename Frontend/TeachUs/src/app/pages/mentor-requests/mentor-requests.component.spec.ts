import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

import { MentorRequestsComponent } from './mentor-requests.component';
import { RequestModel } from 'src/app/models/request-model';

fdescribe('MentorRequestsComponent', () => {
  let component: MentorRequestsComponent;
  let fixture: ComponentFixture<MentorRequestsComponent>;
  let requests: RequestModel[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MentorRequestsComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorRequestsComponent);
    component = fixture.componentInstance;
    requests = [{
      fullName: "student1",
      email: "student1@yahoo.com",
      matchDate: '2023-01-21T22:58:50.7697837',
      status: 'Waiting',
      subject: "Informatics"
    },
    {
      fullName: "student2",
      email: "student2@yahoo.com",
      matchDate: '2023-01-21T22:58:50.7697837',
      status: 'Waiting',
      subject: "Informatics"
    },
    {
      fullName: "student3",
      email: "student3@yahoo.com",
      matchDate: '2023-01-21T22:58:50.7697837',
      status: 'Waiting',
      subject: "Informatics"
    }];
    component.requests = requests;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call acceptStudent when clicked', () => {
    spyOn(component
      , 'acceptStudent');
      let buttons = fixture.debugElement.queryAll(By.css('button'));
      if (buttons.length > 0) {
        buttons[0].triggerEventHandler('click',null);
        expect(component.acceptStudent).toHaveBeenCalledWith('student1@yahoo.com', 'Informatics');
      } else {
        console.error("There is no button to be clicked");
      }
    });
  
    it('should call rejectStudent when clicked', () => {
      spyOn(component, 'rejectStudent');
      let buttons = fixture.debugElement.queryAll(By.css('button'));
      if (buttons.length > 1) {
        buttons[1].triggerEventHandler('click',null);
        expect(component.rejectStudent).toHaveBeenCalledWith('student1@yahoo.com', 'Informatics');
      } else {
        console.error("There is no button to be clicked");
      }
    });
  });