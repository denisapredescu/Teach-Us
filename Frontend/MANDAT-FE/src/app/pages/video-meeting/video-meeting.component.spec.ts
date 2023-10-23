import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoMeetingComponent } from './video-meeting.component';

describe('VideoMeetingComponent', () => {
  let component: VideoMeetingComponent;
  let fixture: ComponentFixture<VideoMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoMeetingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
