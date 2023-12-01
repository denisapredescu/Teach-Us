import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { HomePageComponent } from "./home-page.component";
import { MentorModel } from "src/app/models/mentor-model";
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HomeCardComponent } from "src/app/components/home-card/home-card.component";
import { MentorService } from "src/app/services/mentor.service";
import { of, throwError } from 'rxjs';
fdescribe("HomePageComponent", () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let mentors: MentorModel[] = [];
  let selectedSubject: string = "";
  let mentorServiceSpy: jasmine.SpyObj<MentorService>;
  let mentorService: MentorService;
  beforeEach(async () => {
    mentorServiceSpy = jasmine.createSpyObj('MentorService', ['getAllMentors']);
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, FormsModule],
      declarations: [HomePageComponent, HomeCardComponent],
      providers:[MentorService]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;


    mentorService = TestBed.get(MentorService);/////////////////////////

    fixture.detectChanges();
  });

  beforeEach(async () => {
    mentors = [
      {
        username: "ana",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: new Date(),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["mate"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 2,
        price: [50],
      },
      {
        username: "daniel",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: new Date(),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["mate"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 5,
        price: [50],
      },
      {
        username: "mircea",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: new Date(),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["romana"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 1,
        price: [50],
      },
      {
        username: "mirceaR",
        email: "email",
        phoneNumber: "0728282102",
        passwordHash: "csdmpodcsc",
        createdAt: new Date(),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "ase",
        subject: ["romana"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei 2",
        numberOfStars: 1,
        price: [60],
      },
      {
        username: "ileana",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: new Date(),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["info"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 1,
        price: [50],
      },
      {
        username: "cristi",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: new Date(),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["mate"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 4,
        price: [50],
      },
      {
        username: "sara",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: new Date(),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["spaniola", "mate"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 1,
        price: [50, 20],
      },
      {
        username: "sabina",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: new Date(),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["spaniola", "chimie"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 2,
        price: [30, 20],
      }
    ];
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('should handle empty mentors array on initialization', () => {
    mentorServiceSpy.getAllMentors.and.returnValue(of([]));
    component.ngOnInit();
    expect(component.mentors.length).toBe(0);
  });

  it('test subsribe method call', fakeAsync(() => {
    let mentorSpy = spyOn(mentorService, 'getAllMentors').and.returnValue(of(mentors));
    let subSpy = spyOn(mentorService.getAllMentors(), 'subscribe');
    component.ngOnInit();
    tick();

    expect(mentorSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  it('should sort mentors by numberOfStars in descending order', () => {
    component.mentors = mentors;
    component.sortByNameASC("");

    expect(component.topMentors[0].numberOfStars).toBe(5);
    expect(component.topMentors[1].numberOfStars).toBe(4);
    expect(component.topMentors[2].numberOfStars).toBe(2);
    expect(component.topMentors[3].numberOfStars).toBe(2);
    expect(component.topMentors[4].numberOfStars).toBe(1);
    expect(component.topMentors[5].numberOfStars).toBe(1);
    expect(component.topMentors[6].numberOfStars).toBe(1);
    expect(component.topMentors[7].numberOfStars).toBe(1);

    expect(component.topMentors).toEqual([
      {
        username: "daniel",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["mate"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 5,
        price: [50],
      },
      {
        username: "cristi",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["mate"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 4,
        price: [50],
      },
      {
        username: "ana",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["mate"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 2,
        price: [50]
      },
      {
        username: "sabina",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["spaniola", "chimie"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 2,
        price: [30, 20],
      },
      {
        username: "mircea",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["romana"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 1,
        price: [50],
      },
      {
        username: "mirceaR",
        email: "email",
        phoneNumber: "0728282102",
        passwordHash: "csdmpodcsc",
        createdAt: jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "ase",
        subject: ["romana"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei 2",
        numberOfStars: 1,
        price: [60],
      },
      {
        username: "ileana",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["info"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 1,
        price: [50],
      },
      {
        username: "sara",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["spaniola", "mate"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 1,
        price: [50, 20],
      }
    ])
  });

  it('should sort mentors by numberOfStars in descending order for given subject', () => {
    component.mentors = mentors;
    component.sortByNameASC("mate");

    expect(component.topMentors[0].numberOfStars).toBe(5);
    expect(component.topMentors[1].numberOfStars).toBe(4);
    expect(component.topMentors[2].numberOfStars).toBe(2);
    expect(component.topMentors[3].numberOfStars).toBe(1);

    expect(component.topMentors).toEqual([
      {
        username: "daniel",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["mate"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 5,
        price: [50],
      },
      {
        username: "cristi",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["mate"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 4,
        price: [50],
      },
      {
        username: "ana",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["mate"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 2,
        price: [50]
      },
      {
        username: "sara",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["spaniola", "mate"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 1,
        price: [50, 20]
      }]);
  });
  // it("should match snapshot", () => {
  //   fixture.detectChanges();
  //   (<any>expect(fixture)).toMatchSnapshot();
  // });
  it("should be ordered by stars based on subject that does not have results", () => {
    component.selectedSubject = "chineza";
    component.mentors = mentors;
    component.onSubjectChange();
    expect(component.topMentors.length).toBe(3);
    expect(component.topMentors[0].numberOfStars).toBe(0);
    expect(component.topMentors[1].numberOfStars).toBe(0);
    expect(component.topMentors[2].numberOfStars).toBe(0);
    expect(component.topMentors[0]).toEqual(
      {
        username: "",
        email: "email",
        phoneNumber: "",
        passwordHash: "",
        createdAt: jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "",
        educationalInstitution: "fmi",
        subject: [],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 0,
        price: [50],
      }
    );

    expect(component.topMentors[1]).toEqual(
      {
        username: "",
        email: "email",
        phoneNumber: "",
        passwordHash: "",
        createdAt: jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "",
        educationalInstitution: "fmi",
        subject: [],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 0,
        price: [50],
      });

    expect(component.topMentors[2]).toEqual(
      {
        username: "",
        email: "email",
        phoneNumber: "",
        passwordHash: "",
        createdAt: jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "",
        educationalInstitution: "fmi",
        subject: [],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 0,
        price: [50],
      });
  });

  
  it("should be ordered by stars based on subject mate", () => {
    component.selectedSubject = "mate";
    component.mentors = mentors;
    component.onSubjectChange();
    const currentDate = new Date();

    expect(component.topMentors.length).toBe(3);
    expect(component.topMentors[0].numberOfStars).toBe(4);
    expect(component.topMentors[1].numberOfStars).toBe(5);
    expect(component.topMentors[2].numberOfStars).toBe(2);
    expect(component.topMentors[0]).toEqual(
      {
        username: "cristi",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["mate"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 4,
        price: [50],
      }
    );

    expect(component.topMentors[1]).toEqual(
      {
        username: "daniel",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["mate"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 5,
        price: [50],
      });

    expect(component.topMentors[2]).toEqual(
      {
        username: "ana",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["mate"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 2,
        price: [50],
      });
  });

  it("should be ordered by stars based on subject spaniola", () => {
    component.selectedSubject = "spaniola";
    component.mentors = mentors;
    component.onSubjectChange();

    expect(component.topMentors.length).toBe(3);
    expect(component.topMentors[0].numberOfStars).toBe(1);
    expect(component.topMentors[1].numberOfStars).toBe(2);
    expect(component.topMentors[2].numberOfStars).toBe(0);
    expect(component.topMentors[0]).toEqual(
      {
        username: "sara",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt:jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["spaniola", "mate"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 1,
        price: [50, 20],
      }
    );

    expect(component.topMentors[1]).toEqual(
      {
        username: "sabina",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["spaniola", "chimie"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 2,
        price: [30, 20],
      });

    expect(component.topMentors[2]).toEqual(
      {
        username: "",
        email: "email",
        phoneNumber: "",
        passwordHash: "",
        createdAt: jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "",
        educationalInstitution: "fmi",
        subject: [],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 0,
        price: [50],
      });
  });

  it("should be ordered by stars initial", () => {
    component.selectedSubject = "";
    component.mentors = mentors;
    component.onSubjectChange();

    expect(component.topMentors.length).toBe(3);
    expect(component.topMentors[0].numberOfStars).toBe(4);
    expect(component.topMentors[1].numberOfStars).toBe(5);
    expect(component.topMentors[2].numberOfStars).toBe(2);
    expect(component.topMentors[0]).toEqual(
      {
        username: "cristi",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["mate"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 4,
        price: [50],
      }
    );

    expect(component.topMentors[1]).toEqual(
      {
        username: "daniel",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["mate"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 5,
        price: [50],
      });

    expect(component.topMentors[2]).toEqual(
      {
        username: "ana",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["mate"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 2,
        price: [50],
      });
  });

  it("should be ordered by stars based on subject with just first place", () => {
    component.selectedSubject = "info";
    component.mentors = mentors;
    component.onSubjectChange();
    expect(component.topMentors.length).toBe(3);
    expect(component.topMentors[0].numberOfStars).toBe(0);
    expect(component.topMentors[1].numberOfStars).toBe(1);
    expect(component.topMentors[2].numberOfStars).toBe(0);

    expect(component.topMentors).toEqual([
     { username: "",
      email: "email",
      phoneNumber: "",
      passwordHash: "",
      createdAt: jasmine.any(Date),
      isActive: true,
      isDeleted: false,
      bio: "",
      educationalInstitution: "fmi",
      subject: [],
      reviewStatus: "nimic",
      city: "buc",
      county: "ro",
      addressInfo: "dr taberei",
      numberOfStars: 0,
      price: [50],
    },
    {
      username: "ileana",
      email: "email",
      phoneNumber: "0728282106",
      passwordHash: "csdcsdcsc",
      createdAt: jasmine.any(Date),
      isActive: true,
      isDeleted: false,
      bio: "bio",
      educationalInstitution: "fmi",
      subject: ["info"],
      reviewStatus: "nimic",
      city: "buc",
      county: "ro",
      addressInfo: "dr taberei",
      numberOfStars: 1,
      price: [50],
    },
    {
      username: "",
      email: "email",
      phoneNumber: "",
      passwordHash: "",
      createdAt: jasmine.any(Date),
      isActive: true,
      isDeleted: false,
      bio: "",
      educationalInstitution: "fmi",
      subject: [],
      reviewStatus: "nimic",
      city: "buc",
      county: "ro",
      addressInfo: "dr taberei",
      numberOfStars: 0,
      price: [50],
    }]);
  });

  it("should be ordered by stars based on subject with first and second place", () => {
    component.selectedSubject = "romana";
    component.mentors = mentors;
    component.onSubjectChange();
    expect(component.topMentors.length).toBe(3);
    expect(component.topMentors[0].numberOfStars).toBe(1);
    expect(component.topMentors[1].numberOfStars).toBe(1);
    expect(component.topMentors[2].numberOfStars).toBe(0);

    expect(component.topMentors[0]).toEqual(
      {
        username: "mirceaR",
        email: "email",
        phoneNumber: "0728282102",
        passwordHash: "csdmpodcsc",
        createdAt: jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "ase",
        subject: ["romana"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei 2",
        numberOfStars: 1,
        price: [60],
      });
    expect(component.topMentors[1]).toEqual(
      {
        username: "mircea",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["romana"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 1,
        price: [50],
      }
    );
    expect(component.topMentors[2]).toEqual(
      {
        username: "",
        email: "email",
        phoneNumber: "",
        passwordHash: "",
        createdAt: jasmine.any(Date),
        isActive: true,
        isDeleted: false,
        bio: "",
        educationalInstitution: "fmi",
        subject: [],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 0,
        price: [50],
      }
    )
  });
});
