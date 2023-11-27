import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPageStudentComponent } from './video-page-student.component';

describe('VideoPageStudentComponent', () => {
  let component: VideoPageStudentComponent;
  let fixture: ComponentFixture<VideoPageStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoPageStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoPageStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
