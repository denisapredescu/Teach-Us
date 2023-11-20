import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPageMentorComponent } from './video-page-mentor.component';

describe('VideoPageMentorComponent', () => {
  let component: VideoPageMentorComponent;
  let fixture: ComponentFixture<VideoPageMentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoPageMentorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoPageMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
