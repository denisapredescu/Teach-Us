import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MentorModel } from 'src/app/models/mentor-model';

import { MyMentorsComponent } from './my-mentors.component';

fdescribe('MyMentorsComponent', () => {
  let component: MyMentorsComponent;
  let fixture: ComponentFixture<MyMentorsComponent>;
  let mentors: MentorModel[]=[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule
      ],
      declarations: [ MyMentorsComponent ],
    }).compileComponents();

    fixture = TestBed.createComponent(MyMentorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(async () => {
    mentors = [{
      username: "mentor1",
      email: "mentor1@yahoo.com",
      phoneNumber: "07256987456",
      passwordHash: "10000.lbtKKPU8Ny6JcehzrkeNOg==.Aq/jgy1tvhmpr530iqoohtUfy7HH1O4bXktBcm2MMVY=",
      createdAt: new Date(50000),
      isActive: true,
      isDeleted: false,
      bio: "string",
      educationalInstitution: "string",
      subject: ["string"],
      price: [20],
      reviewStatus: "ReviewStudent",
      city: "string",
      county: "string",
      addressInfo: "string",
      numberOfStars: 2,
      link: "https://meet.jit.si/grew-continent-ability"
    },
    {
      username: "mentor2",
      email: "mentor2@yahoo.com",
      phoneNumber: "07256987456",
      passwordHash: "10000.jYWkO60B3qrmi4mtIRvGbA==.Kd/zbfdwWrJQmoaIjptFteR7cXPQQMNLBIgg8WZxTpY=",
      createdAt: new Date(50000),
      isActive: true,
      isDeleted: false,
      bio: "string",
      educationalInstitution: "string",
      subject: ["string"],
      price: [20],
      reviewStatus: "ReviewStudent",
      city: "string",
      county: "string",
      addressInfo: "string",
      numberOfStars: 2,
      link: "https://meet.jit.si/grew-continent-ability"
    },
    {
      username: "imentor3",
      email: "mentor3@yahoo.com",
      phoneNumber: "07256987456",
      passwordHash: "10000.2l0tOGB1ua0aU4wxQ/gG8w==.4EmTGIIfbrdv0Twp7aY5JDUsx2KpSaOPMqjuV99v54k=",
      createdAt: new Date(50000),
      isActive: true,
      isDeleted: false,
      bio: "string",
      educationalInstitution: "string",
      subject: ["string"],
      price: [20],
      reviewStatus: "ReviewStudent",
      city: "string",
      county: "string",
      addressInfo: "string",
      numberOfStars: 3,
      link: "https://meet.jit.si/grew-continent-ability"
    }];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should be ordered by name asc", () => {
    component.mentors = mentors;
    component.sortByNameASC();

    expect(component.mentors).toEqual([
      {
        username: "imentor3",
        email: "mentor3@yahoo.com",
        phoneNumber: "07256987456",
        passwordHash: "10000.2l0tOGB1ua0aU4wxQ/gG8w==.4EmTGIIfbrdv0Twp7aY5JDUsx2KpSaOPMqjuV99v54k=",
        createdAt: new Date(50000),
        isActive: true,
        isDeleted: false,
        bio: "string",
        educationalInstitution: "string",
        subject: ["string"],
        price: [20],
        reviewStatus: "ReviewStudent",
        city: "string",
        county: "string",
        addressInfo: "string",
        numberOfStars: 3,
        link: "https://meet.jit.si/grew-continent-ability"
      },
      {
        username: "mentor1",
        email: "mentor1@yahoo.com",
        phoneNumber: "07256987456",
        passwordHash: "10000.lbtKKPU8Ny6JcehzrkeNOg==.Aq/jgy1tvhmpr530iqoohtUfy7HH1O4bXktBcm2MMVY=",
        createdAt: new Date(50000),
        isActive: true,
        isDeleted: false,
        bio: "string",
        educationalInstitution: "string",
        subject: ["string"],
        price: [20],
        reviewStatus: "ReviewStudent",
        city: "string",
        county: "string",
        addressInfo: "string",
        numberOfStars: 2,
        link: "https://meet.jit.si/grew-continent-ability"
      },
      {
        username: "mentor2",
        email: "mentor2@yahoo.com",
        phoneNumber: "07256987456",
        passwordHash: "10000.jYWkO60B3qrmi4mtIRvGbA==.Kd/zbfdwWrJQmoaIjptFteR7cXPQQMNLBIgg8WZxTpY=",
        createdAt: new Date(50000),
        isActive: true,
        isDeleted: false,
        bio: "string",
        educationalInstitution: "string",
        subject: ["string"],
        price: [20],
        reviewStatus: "ReviewStudent",
        city: "string",
        county: "string",
        addressInfo: "string",
        numberOfStars: 2,
        link: "https://meet.jit.si/grew-continent-ability"
      }
    ]);
  });

  it("should be ordered by name desc", () => {
    component.mentors = mentors;
    component.sortByNameDESC();

    expect(component.mentors).toEqual([
      {
        username: "mentor2",
        email: "mentor2@yahoo.com",
        phoneNumber: "07256987456",
        passwordHash: "10000.jYWkO60B3qrmi4mtIRvGbA==.Kd/zbfdwWrJQmoaIjptFteR7cXPQQMNLBIgg8WZxTpY=",
        createdAt: new Date(50000),
        isActive: true,
        isDeleted: false,
        bio: "string",
        educationalInstitution: "string",
        subject: ["string"],
        price: [20],
        reviewStatus: "ReviewStudent",
        city: "string",
        county: "string",
        addressInfo: "string",
        numberOfStars: 2,
        link: "https://meet.jit.si/grew-continent-ability"
      },
      {
        username: "mentor1",
        email: "mentor1@yahoo.com",
        phoneNumber: "07256987456",
        passwordHash: "10000.lbtKKPU8Ny6JcehzrkeNOg==.Aq/jgy1tvhmpr530iqoohtUfy7HH1O4bXktBcm2MMVY=",
        createdAt: new Date(50000),
        isActive: true,
        isDeleted: false,
        bio: "string",
        educationalInstitution: "string",
        subject: ["string"],
        price: [20],
        reviewStatus: "ReviewStudent",
        city: "string",
        county: "string",
        addressInfo: "string",
        numberOfStars: 2,
        link: "https://meet.jit.si/grew-continent-ability"
      },
      {
        username: "imentor3",
        email: "mentor3@yahoo.com",
        phoneNumber: "07256987456",
        passwordHash: "10000.2l0tOGB1ua0aU4wxQ/gG8w==.4EmTGIIfbrdv0Twp7aY5JDUsx2KpSaOPMqjuV99v54k=",
        createdAt: new Date(50000),
        isActive: true,
        isDeleted: false,
        bio: "string",
        educationalInstitution: "string",
        subject: ["string"],
        price: [20],
        reviewStatus: "ReviewStudent",
        city: "string",
        county: "string",
        addressInfo: "string",
        numberOfStars: 3,
        link: "https://meet.jit.si/grew-continent-ability"
      }
    ]);
  });

  it("should be ordered by number of stars asc", () => {
    component.mentors = mentors;
    component.sortedStarsAscending();

    expect(component.mentors).toEqual([
      {
        username: "mentor1",
        email: "mentor1@yahoo.com",
        phoneNumber: "07256987456",
        passwordHash: "10000.lbtKKPU8Ny6JcehzrkeNOg==.Aq/jgy1tvhmpr530iqoohtUfy7HH1O4bXktBcm2MMVY=",
        createdAt: new Date(50000),
        isActive: true,
        isDeleted: false,
        bio: "string",
        educationalInstitution: "string",
        subject: ["string"],
        price: [20],
        reviewStatus: "ReviewStudent",
        city: "string",
        county: "string",
        addressInfo: "string",
        numberOfStars: 2,
        link: "https://meet.jit.si/grew-continent-ability"
      },
      {
        username: "mentor2",
        email: "mentor2@yahoo.com",
        phoneNumber: "07256987456",
        passwordHash: "10000.jYWkO60B3qrmi4mtIRvGbA==.Kd/zbfdwWrJQmoaIjptFteR7cXPQQMNLBIgg8WZxTpY=",
        createdAt: new Date(50000),
        isActive: true,
        isDeleted: false,
        bio: "string",
        educationalInstitution: "string",
        subject: ["string"],
        price: [20],
        reviewStatus: "ReviewStudent",
        city: "string",
        county: "string",
        addressInfo: "string",
        numberOfStars: 2,
        link: "https://meet.jit.si/grew-continent-ability"
      },
      {
        username: "imentor3",
        email: "mentor3@yahoo.com",
        phoneNumber: "07256987456",
        passwordHash: "10000.2l0tOGB1ua0aU4wxQ/gG8w==.4EmTGIIfbrdv0Twp7aY5JDUsx2KpSaOPMqjuV99v54k=",
        createdAt: new Date(50000),
        isActive: true,
        isDeleted: false,
        bio: "string",
        educationalInstitution: "string",
        subject: ["string"],
        price: [20],
        reviewStatus: "ReviewStudent",
        city: "string",
        county: "string",
        addressInfo: "string",
        numberOfStars: 3,
        link: "https://meet.jit.si/grew-continent-ability"
      }
    ]);
  });

  it("should be ordered by number of stars desc", () => {
    component.mentors = mentors;
    component.sortedStarsDescending();

    expect(component.mentors).toEqual([
      {
        username: "imentor3",
        email: "mentor3@yahoo.com",
        phoneNumber: "07256987456",
        passwordHash: "10000.2l0tOGB1ua0aU4wxQ/gG8w==.4EmTGIIfbrdv0Twp7aY5JDUsx2KpSaOPMqjuV99v54k=",
        createdAt: new Date(50000),
        isActive: true,
        isDeleted: false,
        bio: "string",
        educationalInstitution: "string",
        subject: ["string"],
        price: [20],
        reviewStatus: "ReviewStudent",
        city: "string",
        county: "string",
        addressInfo: "string",
        numberOfStars: 3,
        link: "https://meet.jit.si/grew-continent-ability"
      },
      {
        username: "mentor1",
        email: "mentor1@yahoo.com",
        phoneNumber: "07256987456",
        passwordHash: "10000.lbtKKPU8Ny6JcehzrkeNOg==.Aq/jgy1tvhmpr530iqoohtUfy7HH1O4bXktBcm2MMVY=",
        createdAt: new Date(50000),
        isActive: true,
        isDeleted: false,
        bio: "string",
        educationalInstitution: "string",
        subject: ["string"],
        price: [20],
        reviewStatus: "ReviewStudent",
        city: "string",
        county: "string",
        addressInfo: "string",
        numberOfStars: 2,
        link: "https://meet.jit.si/grew-continent-ability"
      },
      {
        username: "mentor2",
        email: "mentor2@yahoo.com",
        phoneNumber: "07256987456",
        passwordHash: "10000.jYWkO60B3qrmi4mtIRvGbA==.Kd/zbfdwWrJQmoaIjptFteR7cXPQQMNLBIgg8WZxTpY=",
        createdAt: new Date(50000),
        isActive: true,
        isDeleted: false,
        bio: "string",
        educationalInstitution: "string",
        subject: ["string"],
        price: [20],
        reviewStatus: "ReviewStudent",
        city: "string",
        county: "string",
        addressInfo: "string",
        numberOfStars: 2,
        link: "https://meet.jit.si/grew-continent-ability"
      }
    ]);
  });

  it('should call getMyReviews when clicked', fakeAsync(() => {
    spyOn(component, 'getMyReviews');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(component.getMyReviews).toHaveBeenCalled();
  }));

});
