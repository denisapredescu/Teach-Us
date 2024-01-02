import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { VideoPageMentorComponent } from './video-page-mentor.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MentorRequestsService } from 'src/app/services/mentor-requests.service';
import { VideoService } from 'src/app/services/video.service';
import { of } from 'rxjs';

fdescribe('VideoPageMentorComponent', () => {
  let component: VideoPageMentorComponent;
  let fixture: ComponentFixture<VideoPageMentorComponent>;
  let mentorRequestsServiceSpy: jasmine.SpyObj<MentorRequestsService>;
  let videoServiceSpy: jasmine.SpyObj<VideoService>;
 
  beforeEach(async () => {
    mentorRequestsServiceSpy = jasmine.createSpyObj("MentorRequestsService", ['GetAllMatchingStudents']);
    videoServiceSpy = jasmine.createSpyObj('VideoService', ['createVideo']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, FormsModule,ReactiveFormsModule],
      declarations: [ VideoPageMentorComponent ],
      providers: [
        { provide: MentorRequestsService, useValue: mentorRequestsServiceSpy },
       { provide: VideoService, useValue: videoServiceSpy },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoPageMentorComponent);
    component = fixture.componentInstance;
    const emailMentor = 'clara@yahoo.com';
    
    mentorRequestsServiceSpy.GetAllMatchingStudents.and.returnValue(of(['andreea@yahoo.com', 'hanuta@yahoo.com','sandra@yahoo.com']));
    fixture.detectChanges();

   
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with mentor email and get matching students', () => {
    const emailMentor = 'clara@yahoo.com';
    spyOn(localStorage, 'getItem').and.returnValue(emailMentor);
    mentorRequestsServiceSpy.GetAllMatchingStudents.and.returnValue(of(['andreea@yahoo.com', 'hanuta@yahoo.com','sandra@yahoo.com']));
    component.ngOnInit();
    expect(component.emailMentor).toBe(emailMentor);
    expect(mentorRequestsServiceSpy.GetAllMatchingStudents).toHaveBeenCalledWith(emailMentor);
    expect(component.studentsEmails).toEqual(['andreea@yahoo.com', 'hanuta@yahoo.com','sandra@yahoo.com']);
  });

  it('should check if form is complete', () => {
    component.videoAddForm.setValue({
      mentorEmail: 'clara@yahoo.com',
      studentEmail: 'andreea@yahoo.com',
      videoUrl: 'https://www.youtube.com/watch?v=015FNA70G4g&ab_channel=DozaDeIstorie',
      youtubeVideoCode: '015FNA70G4g',
      subject: 'History',
      
    });

    component.checkFormComplete();

    expect(component.isFormComplete).toBe(true);
  });

  it('should say that form is not complete if any field is not complet', () => {
    component.videoAddForm.setValue({
      mentorEmail: 'clara@yahoo.com',
      studentEmail: 'andreea@yahoo.com',
      videoUrl: 'https://www.youtube.com/watch?v=015FNA70G4g&ab_channel=DozaDeIstorie',
      youtubeVideoCode: '015FNA70G4g',
      subject: '',
    });
    component.checkFormComplete();
    expect(component.isFormComplete).toBe(false);
  });


  it('should save video details', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('clara@yahoo.com');
    component.videoAddForm.setValue({
      mentorEmail: 'clara@yahoo.com',
      studentEmail: 'andreea@yahoo.com',
      videoUrl: 'https://www.youtube.com/watch?v=bKGKGU2UbwY&ab_channel=Atentie%2CCadMere%21',
      youtubeVideoCode: '015FNA70G4g',
      subject: 'History',
    });
    component.videoAddForm.get('mentorEmail')?.setValue('clara@yahoo.com');
    videoServiceSpy.createVideo.and.returnValue(of({
      "mentorId": "edca0a82-5141-4e0c-ba5b-183de37bbc22",
      "studentId": "56b1b94a-a579-4c92-aa02-563ac41e4cfd",
      "sendDate": "2023-11-30T20:11:11.210249Z",
      "videoUrl": "https://www.youtube.com/watch?v=bKGKGU2UbwY&ab_channel=Atentie%2CCadMere%21",
      "youtubeVideoCode": "015FNA70G4g",
      "subject": "History",
      "student": {
          "id": "56b1b94a-a579-4c92-aa02-563ac41e4cfd",
          "studentGrade": 0,
          "studentSchoolQualification": "",
          "user": null,
          "reviews": null,
          "matches": null,
          "videoMeetingsDetails": null,
          "assessments": null,
          "videos": []
      },
      "mentor": {
          "id": "edca0a82-5141-4e0c-ba5b-183de37bbc22",
          "mentorIdentityCardFront": "EBAQEBAQEA==",
          "mentorIdentityCardBack": "EBAQEBAQEA==",
          "user": null,
          "announcements": null,
          "reviews": null,
          "matches": null,
          "videoMeetingsDetails": null,
          "assessments": null,
          "videos": []
      }
  }));
    component.saveDetailsVideo();
    expect(component.videoAddForm.get('studentEmail')?.value).toBe('andreea@yahoo.com');
    expect(component.videoAddForm.get('videoUrl')?.value).toBe('https://www.youtube.com/watch?v=bKGKGU2UbwY&ab_channel=Atentie%2CCadMere%21');
    expect(component.videoAddForm.get('youtubeVideoCode')?.value).toBe('015FNA70G4g');
    expect(component.videoAddForm.get('subject')?.value).toBe('History');

    expect(videoServiceSpy.createVideo).toHaveBeenCalledWith(jasmine.objectContaining({
      studentEmail: 'andreea@yahoo.com',
      videoUrl: 'https://www.youtube.com/watch?v=bKGKGU2UbwY&ab_channel=Atentie%2CCadMere%21',
      youtubeVideoCode: '015FNA70G4g',
      subject: 'History',
    }));
  }));

});
