import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MentorModel } from 'src/app/models/mentor-model';
import { MentorsComponent } from './mentors.component';
import { CookieService } from 'ngx-cookie-service';
import { MentorService } from 'src/app/services/mentor.service';
import { of } from 'rxjs';
import { CardComponent } from 'src/app/components/card/card.component';

fdescribe('MentorsComponent', () => {
  let component: MentorsComponent;
  let fixture: ComponentFixture<MentorsComponent>;
  let cookieService: jasmine.SpyObj<CookieService>;
  let mentorService: jasmine.SpyObj<MentorService>;
  let mentors: MentorModel[] = [];

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
        city: "Cluj",
        county: "Cluj",
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
        city: "Cluj",
        county: "Dej",
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
        city: "Cluj",
        county: "Dej",
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
        city: "Cluj",
        county: "Dej",
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
        city: "Cluj",
        county: "Dej",
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
        city: "Cluj",
        county: "Dej",
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
        city: "Bucharest",
        county: "Bucharest",
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei",
        numberOfStars: 2,
        price: [30, 20],
      }
    ];
  });

  beforeEach(async () => {
    cookieService = jasmine.createSpyObj('CookieService', ['get', 'check', 'delete']);
    mentorService = jasmine.createSpyObj('MentorService', ['getAllMentors']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, MatDialogModule],
      declarations: [MentorsComponent, CardComponent],
      providers: [
        { provide: CookieService, useValue: cookieService },
        { provide: MentorService, useValue: mentorService }
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(MentorsComponent);
    component = fixture.componentInstance;
    mentorService.getAllMentors.and.returnValue(of(mentors));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize mentors and perform necessary actions', () => {
    mentorService.getAllMentors.and.returnValue(of(mentors));
    cookieService.get.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return 'Cluj';
        case 'matchCounty':
          return 'Dej';
        case 'matchSubject':
          return 'romana';
        case 'matchMeeting':
          return 'Face-to-Face';
        case 'matchStars':
          return '1';
        default:
          return '';
      }
    });

    spyOn(component, 'filterMentors');

    component.ngOnInit();

    expect(component.mentors).toEqual(mentors);
    expect(component.filterMentors).toHaveBeenCalled();

    expect(cookieService.delete).toHaveBeenCalledWith('matchCity');
    expect(cookieService.delete).toHaveBeenCalledWith('matchCounty');
    expect(cookieService.delete).toHaveBeenCalledWith('matchSubject');
    expect(cookieService.delete).toHaveBeenCalledWith('matchMeeting');
    expect(cookieService.delete).toHaveBeenCalledWith('matchStars');
  });

  it('should filter mentors based on city, county, subject and stars', () => {

    cookieService.check.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return true;
        case 'matchCounty':
          return true;
        case 'matchSubject':
          return true;
        case 'matchStars':
          return true;
        default:
          return false;
      }
    });

    cookieService.get.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return 'Cluj';
        case 'matchCounty':
          return 'Dej';
        case 'matchSubject':
          return 'romana';
        case 'matchStars':
          return '1';
        default:
          return '';
      }
    });


    component.mentors = mentors;

    component.filterMentors();

    expect(component.matchCity).toEqual('Cluj');
    expect(component.matchCounty).toEqual('Dej');
    expect(component.matchSubject).toEqual('romana');
    expect(component.matchStars).toEqual(1);

    expect(component.mentors).toEqual([
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
        city: "Cluj",
        county: "Dej",
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei 2",
        numberOfStars: 1,
        price: [60],
      },
    ]);
  });

  it('should filter mentors based on city', () => {
    cookieService.check.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return true;
        case 'matchCounty':
          return true;
        case 'matchSubject':
          return true;
        case 'matchStars':
          return true;
        default:
          return false;
      }
    });
    cookieService.get.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return 'Bucharest';
        case 'matchCounty':
          return '';
        case 'matchSubject':
          return '';
        case 'matchStars':
          return '0';
        default:
          return '';
      }
    });
    component.mentors = mentors;
    component.filterMentors();
    expect(component.matchCity).toEqual('Bucharest');
    expect(component.matchCounty).toEqual('');
    expect(component.matchSubject).toEqual('');
    expect(component.matchStars).toEqual(0);
    expect(component.mentors).toEqual([
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
        city: "Bucharest",
        county: "Bucharest",
        addressInfo: "dr taberei",
        numberOfStars: 1,
        price: [50, 20],
      }
    ]);
  });

  it('should filter mentors based on county', () => {
    cookieService.check.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return true;
        case 'matchCounty':
          return true;
        case 'matchSubject':
          return true;
        case 'matchStars':
          return true;
        default:
          return false;
      }
    });
    cookieService.get.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return '';
        case 'matchCounty':
          return 'Dej';
        case 'matchSubject':
          return '';
        case 'matchStars':
          return '0';
        default:
          return '';
      }
    });
    component.mentors = mentors;
    component.filterMentors();
    expect(component.matchCity).toEqual('');
    expect(component.matchCounty).toEqual('Dej');
    expect(component.matchSubject).toEqual('');
    expect(component.matchStars).toEqual(0);
    expect(component.mentors).toEqual([
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei",
        numberOfStars: 5,
        price: [50],
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
        city: "Cluj",
        county: "Dej",
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
        city: "Cluj",
        county: "Dej",
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei",
        numberOfStars: 1,
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei",
        numberOfStars: 4,
        price: [50],
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei",
        numberOfStars: 2,
        price: [30, 20],
      }
    ]);
  });

  it('should filter mentors based on subject', () => {
    cookieService.check.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return true;
        case 'matchCounty':
          return true;
        case 'matchSubject':
          return true;
        case 'matchStars':
          return true;
        default:
          return false;
      }
    });
    cookieService.get.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return '';
        case 'matchCounty':
          return '';
        case 'matchSubject':
          return 'info';
        case 'matchStars':
          return '0';
        default:
          return '';
      }
    });
    component.mentors = mentors;
    component.filterMentors();
    expect(component.matchCity).toEqual('');
    expect(component.matchCounty).toEqual('');
    expect(component.matchSubject).toEqual('info');
    expect(component.matchStars).toEqual(0);
    expect(component.mentors).toEqual([
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei",
        numberOfStars: 1,
        price: [50],
      },
    ]);
  });

  it('should filter mentors based on stars', () => {
    cookieService.check.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return true;
        case 'matchCounty':
          return true;
        case 'matchSubject':
          return true;
        case 'matchStars':
          return true;
        default:
          return false;
      }
    });
    cookieService.get.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return '';
        case 'matchCounty':
          return '';
        case 'matchSubject':
          return '';
        case 'matchStars':
          return '1';
        default:
          return '';
      }
    });
    component.mentors = mentors;
    component.filterMentors();
    expect(component.matchCity).toEqual('');
    expect(component.matchCounty).toEqual('');
    expect(component.matchSubject).toEqual('');
    expect(component.matchStars).toEqual(1);
    expect(component.mentors).toEqual([
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
        city: "Cluj",
        county: "Dej",
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
        city: "Cluj",
        county: "Dej",
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
        city: "Cluj",
        county: "Dej",
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
        city: "Bucharest",
        county: "Bucharest",
        addressInfo: "dr taberei",
        numberOfStars: 1,
        price: [50, 20],
      }
    ]);
  });

  it('should filter mentors based on subject and stars', () => {

    cookieService.check.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return true;
        case 'matchCounty':
          return true;
        case 'matchSubject':
          return true;
        case 'matchStars':
          return true;
        default:
          return false;
      }
    });

    cookieService.get.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return '';
        case 'matchCounty':
          return '';
        case 'matchSubject':
          return 'mate';
        case 'matchStars':
          return '1';
        default:
          return '';
      }
    });

    component.mentors = mentors;

    component.filterMentors();

    expect(component.matchCity).toEqual('');
    expect(component.matchCounty).toEqual('');
    expect(component.matchSubject).toEqual('mate');
    expect(component.matchStars).toEqual(1);

    expect(component.mentors).toEqual([
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
        city: "Bucharest",
        county: "Bucharest",
        addressInfo: "dr taberei",
        numberOfStars: 1,
        price: [50, 20],
      },
    ]);
  });

  it('should filter mentors based on county and city', () => {
    cookieService.check.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return true;
        case 'matchCounty':
          return true;
        case 'matchSubject':
          return true;
        case 'matchStars':
          return true;
        default:
          return false;
      }
    });
    cookieService.get.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return 'Cluj';
        case 'matchCounty':
          return 'Dej';
        case 'matchSubject':
          return '';
        case 'matchStars':
          return '0';
        default:
          return '';
      }
    });
    component.mentors = mentors;
    component.filterMentors();
    expect(component.matchCity).toEqual('Cluj');
    expect(component.matchCounty).toEqual('Dej');
    expect(component.matchSubject).toEqual('');
    expect(component.matchStars).toEqual(0);
    expect(component.mentors).toEqual([
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei",
        numberOfStars: 5,
        price: [50],
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
        city: "Cluj",
        county: "Dej",
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
        city: "Cluj",
        county: "Dej",
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei",
        numberOfStars: 1,
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei",
        numberOfStars: 4,
        price: [50],
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei",
        numberOfStars: 2,
        price: [30, 20],
      }
    ]);
  });


  it('should filter mentors based on county and subject', () => {
    cookieService.check.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return true;
        case 'matchCounty':
          return true;
        case 'matchSubject':
          return true;
        case 'matchStars':
          return true;
        default:
          return false;
      }
    });
    cookieService.get.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return '';
        case 'matchCounty':
          return 'Cluj';
        case 'matchSubject':
          return 'mate';
        case 'matchStars':
          return '0';
        default:
          return '';
      }
    });
    component.mentors = mentors;
    component.filterMentors();
    expect(component.matchCity).toEqual('');
    expect(component.matchCounty).toEqual('Cluj');
    expect(component.matchSubject).toEqual('mate');
    expect(component.matchStars).toEqual(0);
    expect(component.mentors).toEqual([
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
        city: "Cluj",
        county: "Cluj",
        addressInfo: "dr taberei",
        numberOfStars: 2,
        price: [50],
      }
    ]);
  });

  it('should filter mentors based on county and subject but not mentors exist', () => {
    cookieService.check.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return true;
        case 'matchCounty':
          return true;
        case 'matchSubject':
          return true;
        case 'matchStars':
          return true;
        default:
          return false;
      }
    });
    cookieService.get.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return '';
        case 'matchCounty':
          return 'Cluj';
        case 'matchSubject':
          return 'romana';
        case 'matchStars':
          return '0';
        default:
          return '';
      }
    });
    component.mentors = mentors;
    component.filterMentors();
    expect(component.matchCity).toEqual('');
    expect(component.matchCounty).toEqual('Cluj');
    expect(component.matchSubject).toEqual('romana');
    expect(component.matchStars).toEqual(0);
    expect(component.mentors.length).toBe(0);
  });

  it('should filter mentors based on county and stars', () => {
    cookieService.check.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return true;
        case 'matchCounty':
          return true;
        case 'matchSubject':
          return true;
        case 'matchStars':
          return true;
        default:
          return false;
      }
    });
    cookieService.get.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return '';
        case 'matchCounty':
          return 'Dej';
        case 'matchSubject':
          return '';
        case 'matchStars':
          return '4';
        default:
          return '';
      }
    });
    component.mentors = mentors;
    component.filterMentors();
    expect(component.matchCity).toEqual('');
    expect(component.matchCounty).toEqual('Dej');
    expect(component.matchSubject).toEqual('');
    expect(component.matchStars).toEqual(4);
    expect(component.mentors).toEqual([
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei",
        numberOfStars: 4,
        price: [50],
      }
    ]);
  });

  it('should filter mentors based on city and subject', () => {
    cookieService.check.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return true;
        case 'matchCounty':
          return true;
        case 'matchSubject':
          return true;
        case 'matchStars':
          return true;
        default:
          return false;
      }
    });
    cookieService.get.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return 'Cluj';
        case 'matchCounty':
          return '';
        case 'matchSubject':
          return 'mate';
        case 'matchStars':
          return '0';
        default:
          return '';
      }
    });
    component.mentors = mentors;
    component.filterMentors();
    expect(component.matchCity).toEqual('Cluj');
    expect(component.matchCounty).toEqual('');
    expect(component.matchSubject).toEqual('mate');
    expect(component.matchStars).toEqual(0);
    expect(component.mentors).toEqual([
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
        city: "Cluj",
        county: "Cluj",
        addressInfo: "dr taberei",
        numberOfStars: 2,
        price: [50],
      },
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
        city: "Cluj",
        county: "Dej",
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei",
        numberOfStars: 4,
        price: [50],
      }
    ]);
  });

  it('should filter mentors based on city and stars', () => {
    cookieService.check.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return true;
        case 'matchCounty':
          return true;
        case 'matchSubject':
          return true;
        case 'matchStars':
          return true;
        default:
          return false;
      }
    });
    cookieService.get.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return 'Cluj';
        case 'matchCounty':
          return '';
        case 'matchSubject':
          return '';
        case 'matchStars':
          return '5';
        default:
          return '';
      }
    });
    component.mentors = mentors;
    component.filterMentors();
    expect(component.matchCity).toEqual('Cluj');
    expect(component.matchCounty).toEqual('');
    expect(component.matchSubject).toEqual('');
    expect(component.matchStars).toEqual(5);
    expect(component.mentors).toEqual([
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei",
        numberOfStars: 5,
        price: [50],
      },
    ]);
  });

  it('should filter mentors based on county, city and subject', () => {
    cookieService.check.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return true;
        case 'matchCounty':
          return true;
        case 'matchSubject':
          return true;
        case 'matchStars':
          return true;
        default:
          return false;
      }
    });
    cookieService.get.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return 'Cluj';
        case 'matchCounty':
          return 'Dej';
        case 'matchSubject':
          return 'spaniola';
        case 'matchStars':
          return '0';
        default:
          return '';
      }
    });
    component.mentors = mentors;
    component.filterMentors();
    expect(component.matchCity).toEqual('Cluj');
    expect(component.matchCounty).toEqual('Dej');
    expect(component.matchSubject).toEqual('spaniola');
    expect(component.matchStars).toEqual(0);
    expect(component.mentors).toEqual([
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei",
        numberOfStars: 2,
        price: [30, 20],
      }
    ]);
  });

  it('should filter mentors based on county, city and stars', () => {
    cookieService.check.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return true;
        case 'matchCounty':
          return true;
        case 'matchSubject':
          return true;
        case 'matchStars':
          return true;
        default:
          return false;
      }
    });
    cookieService.get.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return 'Cluj';
        case 'matchCounty':
          return 'Dej';
        case 'matchSubject':
          return '';
        case 'matchStars':
          return '1';
        default:
          return '';
      }
    });
    component.mentors = mentors;
    component.filterMentors();
    expect(component.matchCity).toEqual('Cluj');
    expect(component.matchCounty).toEqual('Dej');
    expect(component.matchSubject).toEqual('');
    expect(component.matchStars).toEqual(1);
    expect(component.mentors).toEqual([
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
        city: "Cluj",
        county: "Dej",
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
        city: "Cluj",
        county: "Dej",
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei",
        numberOfStars: 1,
        price: [50],
      },
    ]);
  });

  it('should filter mentors based on city, subject and stars', () => {
    cookieService.check.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return true;
        case 'matchCounty':
          return true;
        case 'matchSubject':
          return true;
        case 'matchStars':
          return true;
        default:
          return false;
      }
    });
    cookieService.get.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return 'Cluj';
        case 'matchCounty':
          return '';
        case 'matchSubject':
          return 'mate';
        case 'matchStars':
          return '2';
        default:
          return '';
      }
    });
    component.mentors = mentors;
    component.filterMentors();
    expect(component.matchCity).toEqual('Cluj');
    expect(component.matchCounty).toEqual('');
    expect(component.matchSubject).toEqual('mate');
    expect(component.matchStars).toEqual(2);
    expect(component.mentors).toEqual([
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
        city: "Cluj",
        county: "Cluj",
        addressInfo: "dr taberei",
        numberOfStars: 2,
        price: [50],
      },
    ]);
  });

  it('should filter mentors based on county, subject and stars', () => {
    cookieService.check.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return true;
        case 'matchCounty':
          return true;
        case 'matchSubject':
          return true;
        case 'matchStars':
          return true;
        default:
          return false;
      }
    });
    cookieService.get.and.callFake((key: string) => {
      switch (key) {
        case 'matchCity':
          return '';
        case 'matchCounty':
          return 'Dej';
        case 'matchSubject':
          return 'chimie';
        case 'matchStars':
          return '2';
        default:
          return '';
      }
    });
    component.mentors = mentors;
    component.filterMentors();
    expect(component.matchCity).toEqual('');
    expect(component.matchCounty).toEqual('Dej');
    expect(component.matchSubject).toEqual('chimie');
    expect(component.matchStars).toEqual(2);
    expect(component.mentors).toEqual([
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei",
        numberOfStars: 2,
        price: [30, 20],
      }
    ]);
  });



  it('should sort mentors by name in ascending order', () => {
    component.mentors = mentors;
    component.sortByNameASC();
    expect(component.sortByNameAsc).toBeTrue();
    expect(component.mentors).toEqual([
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
        city: "Cluj",
        county: "Cluj",
        addressInfo: "dr taberei",
        numberOfStars: 2,
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei",
        numberOfStars: 4,
        price: [50],
      },
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei",
        numberOfStars: 5,
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei",
        numberOfStars: 1,
        price: [50],
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
        city: "Cluj",
        county: "Dej",
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei 2",
        numberOfStars: 1,
        price: [60],
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei",
        numberOfStars: 2,
        price: [30, 20],
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
        city: "Bucharest",
        county: "Bucharest",
        addressInfo: "dr taberei",
        numberOfStars: 1,
        price: [50, 20],
      }
    ]);
  });

  it('should sort mentors by name in descending order', () => {
    component.mentors = mentors;
    component.sortByNameDESC();
    expect(component.sortByNameAsc).toBeFalse();
    expect(component.mentors).toEqual([
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
        city: "Bucharest",
        county: "Bucharest",
        addressInfo: "dr taberei",
        numberOfStars: 1,
        price: [50, 20],
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei",
        numberOfStars: 2,
        price: [30, 20],
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei 2",
        numberOfStars: 1,
        price: [60],
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei",
        numberOfStars: 1,
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei",
        numberOfStars: 1,
        price: [50],
      },
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
        city: "Cluj",
        county: "Dej",
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
        city: "Cluj",
        county: "Dej",
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
        city: "Cluj",
        county: "Cluj",
        addressInfo: "dr taberei",
        numberOfStars: 2,
        price: [50],
      }
    ]);
  });

  it('should sort mentors by stars in ascending order', () => {
    component.mentors = mentors;
    component.sortedStarsAscending();

    expect(component.sortByStarsAsc).toBeTrue();
    expect(component.mentors).toEqual([
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
        city: "Cluj",
        county: "Dej",
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
        city: "Cluj",
        county: "Dej",
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
        city: "Cluj",
        county: "Dej",
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
        city: "Bucharest",
        county: "Bucharest",
        addressInfo: "dr taberei",
        numberOfStars: 1,
        price: [50, 20],
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
        city: "Cluj",
        county: "Cluj",
        addressInfo: "dr taberei",
        numberOfStars: 2,
        price: [50],
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei",
        numberOfStars: 2,
        price: [30, 20],
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei",
        numberOfStars: 4,
        price: [50],
      },
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
        city: "Cluj",
        county: "Dej",
        addressInfo: "dr taberei",
        numberOfStars: 5,
        price: [50],
      }
    ]);
  });

  it('should sort mentors by stars in descending order', () => {
    component.mentors = mentors;
    component.sortedStarsDescending();

    expect(component.sortByStarsAsc).toBeFalse();
    expect(component.mentors).toEqual([
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
        city: "Cluj",
        county: "Dej",
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
        city: "Cluj",
        county: "Dej",
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
        city: "Cluj",
        county: "Cluj",
        addressInfo: "dr taberei",
        numberOfStars: 2,
        price: [50],
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
        city: "Cluj",
        county: "Dej",
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
        city: "Cluj",
        county: "Dej",
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
        city: "Cluj",
        county: "Dej",
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
        city: "Cluj",
        county: "Dej",
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
        city: "Bucharest",
        county: "Bucharest",
        addressInfo: "dr taberei",
        numberOfStars: 1,
        price: [50, 20],
      }
    ]);
  });

});
