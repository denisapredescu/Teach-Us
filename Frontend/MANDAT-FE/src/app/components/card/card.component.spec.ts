import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { CardComponent } from "./card.component";
import { StudentModel } from "../../models/student-model";
import { MentorModel } from "../../models/mentor-model";

fdescribe("CardComponent", () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let student: StudentModel;
  let mentor: MentorModel;
  let popup: MatDialogConfig;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule
      ], 
      declarations: [CardComponent],
    }).compileComponents();

    // fixture = TestBed.createComponent(CardComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
    mentor = {
      username: "mentor1",
      email: "mentor1@yahoo.com",
      phoneNumber: "07256987456",
      passwordHash: "10000.lbtKKPU8Ny6JcehzrkeNOg==.Aq/jgy1tvhmpr530iqoohtUfy7HH1O4bXktBcm2MMVY=",
      createdAt: new Date(50000),
      isActive: true,
      isDeleted: false,
      bio: "string",
      educationalInstitution: "string",
      subject: ["Informatics"],
      reviewStatus: "ReviewStudent",
      city: "string",
      county: "string",
      addressInfo: "string",
      numberOfStars: 2,
      link: "https://meet.jit.si/grew-continent-ability",
      price: [20],
    },
    student = {
      username: "student1",
      email: "student1@email.com",
      phoneNumber: "0712345678",
      passwordHash: "10000.ON2pb+5dgOcr00Y7GN+N7A==.JfF2SwcWEregrLQaheM9jhF2u5FFxX7S+GEvzY6Gis8=",
      createdAt: new Date(50000),
      isActive: true,
      isDeleted: true,
      bio: "string",
      educationalInstitution: "string",
      studentGrade: 4,
      studentSchoolQualification: "string",
      subject: ["string"],
      message: "string",
      city: "string",
      county: "string",
      addressInfo: "string",
      numberOfStars: 4,
      price:[]
    };
  
  });

  it("should create with a given student", () => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.person = student;
    component.pageToShowOn = 'my-students';
    fixture.detectChanges();
    
    expect(component).toBeTruthy();
  });

  it("should create with a given mentor", () => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.person = mentor;
    component.pageToShowOn = 'my-mentors';
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it("should click when press to add review", fakeAsync(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.person = student;
    component.pageToShowOn = 'my-students';
    fixture.detectChanges();

    spyOn(component, 'addReview');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(component.addReview).toHaveBeenCalled();
  }));

  it("should click when press to add review MyMentors page", fakeAsync(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.person = mentor;
    component.pageToShowOn = 'my-mentors';
    fixture.detectChanges();

    spyOn(component, 'addReview');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(component.addReview).toHaveBeenCalled();
  }));
});
