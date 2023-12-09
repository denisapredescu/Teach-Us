import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { VideoPageStudentComponent } from './video-page-student.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MentorRequestsService } from 'src/app/services/mentor-requests.service';
import { VideoService } from 'src/app/services/video.service';
import { of } from 'rxjs';

fdescribe('VideoPageStudentComponent', () => {
  let component: VideoPageStudentComponent;
  let fixture: ComponentFixture<VideoPageStudentComponent>;
  let mentorRequestsServiceSpy: jasmine.SpyObj<MentorRequestsService>;
  let videoServiceSpy: jasmine.SpyObj<VideoService>;

  beforeEach(async () => {
    mentorRequestsServiceSpy = jasmine.createSpyObj('MentorRequestsService', ['GetAllMatchingMentorsSubject']);
    videoServiceSpy = jasmine.createSpyObj('VideoService', ['GetVideoForStudent']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, FormsModule,ReactiveFormsModule],
      declarations: [ VideoPageStudentComponent ],
      providers: [
        { provide: MentorRequestsService, useValue: mentorRequestsServiceSpy },
        { provide: VideoService, useValue: videoServiceSpy },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoPageStudentComponent);
    component = fixture.componentInstance;
    const emailStudent = 'hanuta@yahoo.com';
    mentorRequestsServiceSpy.GetAllMatchingMentorsSubject.and.returnValue(of([
      { 
        emailMentor: 'clara@yahoo.com', 
        subject: ['History', 'Informatics','Romanian'] 
      },
      { 
        emailMentor: 'simona@yahoo.com', 
        subject: ['Biology', 'Informatics'] 
      },
    ]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with student email and get matching mentors subject', fakeAsync(() => {
    const emailStudent = 'hanuta@yahoo.com';
    spyOn(localStorage, 'getItem').and.returnValue(emailStudent);
    mentorRequestsServiceSpy.GetAllMatchingMentorsSubject.and.returnValue(of([
      { 
        emailMentor: 'clara@yahoo.com', 
        subject: ['History', 'Informatics','Romanian'] 
      },
      { 
        emailMentor: 'simona@yahoo.com', 
        subject: ['Biology', 'Informatics'] 
      },
    ]));
    component.ngOnInit();
    tick();
    expect(component.emailStudent).toBe(emailStudent);
    expect(component.mentorSubjectForm.get('emailStudent')?.value).toBe(emailStudent);
    component.mentorSubjectForm.get('emailMentor')?.setValue('clara@yahoo.com');
    expect(mentorRequestsServiceSpy.GetAllMatchingMentorsSubject).toHaveBeenCalledWith(emailStudent);
    expect(component.mentorsSubject).toEqual([ { 
        emailMentor: 'clara@yahoo.com', 
        subject: ['History', 'Informatics','Romanian'] 
      },
      { 
        emailMentor: 'simona@yahoo.com', 
        subject: ['Biology', 'Informatics'] 
      }]);
    expect(component.filteredSubjects).toEqual( ['History', 'Informatics','Romanian'] );
  }));

  it('should initialize with student email and get matching mentors but it has not matching mentors', fakeAsync(() => {
    const emailStudent = 'hanuta@yahoo.com';
    spyOn(localStorage, 'getItem').and.returnValue(emailStudent);
    mentorRequestsServiceSpy.GetAllMatchingMentorsSubject.and.returnValue(of([]));
    component.ngOnInit();
    tick();
    expect(component.emailStudent).toBe(emailStudent);
    expect(component.mentorSubjectForm.get('emailStudent')?.value).toBe(emailStudent);

    expect(mentorRequestsServiceSpy.GetAllMatchingMentorsSubject).toHaveBeenCalledWith(emailStudent);
    expect(component.mentorsSubject.length).toBe(0);
    expect(component.filteredSubjects.length).toBe(0);
  }));

  it('should get videos', () => {
    component.mentorSubjectForm.setValue({
      emailStudent: 'hanuta@yahoo.com',
      emailMentor: 'clara@yahoo.com',
      subject:  'History',
    });

    videoServiceSpy.GetVideoForStudent.and.returnValue(of([
      { 
        youtubeVideoCode: '015FNA70G4g',
        sendDate:new Date()
      },
      { 
        youtubeVideoCode: 'yqEdCpPw4yc',
        sendDate:new Date()
      }
    ]));

    component.save();

    expect(videoServiceSpy.GetVideoForStudent).toHaveBeenCalledWith('hanuta@yahoo.com', 'clara@yahoo.com', 'History');
    expect(component.videoCodesDate).toEqual([
      { 
        youtubeVideoCode: '015FNA70G4g',
        sendDate:jasmine.any(Date)
      },
      { 
        youtubeVideoCode: 'yqEdCpPw4yc',
        sendDate:jasmine.any(Date)
      },
    ]);
  });



});





