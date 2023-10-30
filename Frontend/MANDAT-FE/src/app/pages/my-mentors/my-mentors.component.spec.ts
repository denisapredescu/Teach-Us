import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MentorModel } from 'src/app/models/mentor-model';

import { MyMentorsComponent } from './my-mentors.component';

fdescribe('MyMentorsComponent', () => {
  let component: MyMentorsComponent;
  let fixture: ComponentFixture<MyMentorsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyMentorsComponent ],
      
    })
    .compileComponents();
    fixture = TestBed.createComponent(MyMentorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});