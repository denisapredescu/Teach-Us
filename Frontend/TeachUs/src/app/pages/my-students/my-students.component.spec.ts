import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MyStudentsComponent } from "./my-students.component";
import { MatDialogModule } from '@angular/material/dialog';
import { StudentModel } from "src/app/models/student-model";

fdescribe("MyStudentsComponent", () => {
  let component: MyStudentsComponent;
  let fixture: ComponentFixture<MyStudentsComponent>;
  let students: StudentModel[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule
      ], 
      declarations: [MyStudentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(async () => {
    students = [ {
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
      price: [],
      message: "string",
      city: "string",
      county: "string",
      addressInfo: "string",
      numberOfStars: 4
    }, {
      username: "student2",
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
      price: [],
      message: "string",
      city: "string",
      county: "string",
      addressInfo: "string",
      numberOfStars: 3
    }, {
      username: "student2",
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
      price: [],
      message: "string",
      city: "string",
      county: "string",
      addressInfo: "string",
      numberOfStars: 2
    }, {
      username: "student3",
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
      price: [],
      message: "string",
      city: "string",
      county: "string",
      addressInfo: "string",
      numberOfStars: 2
    }];
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should be ordered by name asc", () => {
    component.students = students;
    component.sortByNameASC();

    expect(component.students).toEqual([{
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
      price: [],
      message: "string",
      city: "string",
      county: "string",
      addressInfo: "string",
      numberOfStars: 4
    }, {
      username: "student2",
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
      price: [],
      message: "string",
      city: "string",
      county: "string",
      addressInfo: "string",
      numberOfStars: 3
    }, {
      username: "student2",
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
      price: [],
      message: "string",
      city: "string",
      county: "string",
      addressInfo: "string",
      numberOfStars: 2
    }, {
      username: "student3",
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
      price: [],
      message: "string",
      city: "string",
      county: "string",
      addressInfo: "string",
      numberOfStars: 2
    }
    ]);
  });

  it("should be ordered by name desc", () => {
    component.students = students;
    component.sortByNameDESC();

    expect(component.students).toEqual([
      {
        username: "student3",
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
        price: [],
        message: "string",
        city: "string",
        county: "string",
        addressInfo: "string",
        numberOfStars: 2
      }, {
        username: "student2",
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
        price: [],
        message: "string",
        city: "string",
        county: "string",
        addressInfo: "string",
        numberOfStars: 3
      }, {
        username: "student2",
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
        price: [],
        message: "string",
        city: "string",
        county: "string",
        addressInfo: "string",
        numberOfStars: 2
      }, { 
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
        price: [],
        message: "string",
        city: "string",
        county: "string",
        addressInfo: "string",
        numberOfStars: 4
      }
    ]);
  });

  it("should be ordered by number of stars asc", () => {
    component.students = students;
    component.sortedStarsAscending();

    expect(component.students).toEqual([ {
      username: "student2",
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
      price: [],
      message: "string",
      city: "string",
      county: "string",
      addressInfo: "string",
      numberOfStars: 2
    }, {
      username: "student3",
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
      price: [],
      message: "string",
      city: "string",
      county: "string",
      addressInfo: "string",
      numberOfStars: 2
    }, {
      username: "student2",
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
      price: [],
      message: "string",
      city: "string",
      county: "string",
      addressInfo: "string",
      numberOfStars: 3
    }, {
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
      price: [],
      message: "string",
      city: "string",
      county: "string",
      addressInfo: "string",
      numberOfStars: 4
    }
    ]);
  });

  it("should be ordered by number of stars desc", () => {
    component.students = students;
    component.sortedStarsDescending();

    expect(component.students).toEqual([ 
      {
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
        price: [],
        message: "string",
        city: "string",
        county: "string",
        addressInfo: "string",
        numberOfStars: 4
      }, {
        username: "student2",
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
        price: [],
        message: "string",
        city: "string",
        county: "string",
        addressInfo: "string",
        numberOfStars: 3
      }, {
        username: "student2",
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
        price: [],
        message: "string",
        city: "string",
        county: "string",
        addressInfo: "string",
        numberOfStars: 2
      }, {
        username: "student3",
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
        price: [],
        message: "string",
        city: "string",
        county: "string",
        addressInfo: "string",
        numberOfStars: 2
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
