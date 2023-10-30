import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MentorModel } from 'src/app/models/mentor-model';
import { MentorsComponent } from './mentors.component';

fdescribe('MentorsComponent', () => {
  let component: MentorsComponent;
  let fixture: ComponentFixture<MentorsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorsComponent ],
      
    })
    .compileComponents();
    fixture = TestBed.createComponent(MentorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
