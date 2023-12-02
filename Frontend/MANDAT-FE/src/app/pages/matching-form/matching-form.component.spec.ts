import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchingFormComponent } from './matching-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { subjects } from 'src/app/constants/subjects';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('MatchingFormComponent', () => {
  let component: MatchingFormComponent;
  let fixture: ComponentFixture<MatchingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, MatFormFieldModule,MatSelectModule,FormsModule,MatInputModule,BrowserAnimationsModule],
      declarations: [ MatchingFormComponent ],
      providers: [CookieService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set stars value on onStarsChanged', () => {
    component.onStarsChanged(5);
    expect(component.stars).toEqual(5);
  });

  it('should initialize properties correctly', () => {
    expect(component.subjects).toEqual(subjects);
    expect(component.meetingTypes).toEqual(['Online', 'Face-To-Face']);
    expect(component.stars).toEqual(0);
    expect(component.displayType).toEqual('none');
    expect(component.model).toEqual({
      county: '',
      subjects: '',
      city: '',
      meetingType: '',
      stars: 0,
    });
  });

  it('should match and navigate', () => {
    const cookieService = TestBed.inject(CookieService);
    const router = TestBed.inject(Router);
    spyOn(cookieService, 'set').and.stub();
    spyOn(router, 'navigate').and.stub();
    component.model = {
      county: 'Dej',
      subjects: 'Romanian',
      city: 'Cluj',
      meetingType: 'Face-To-Face',
      stars: 0,
    };
    component.stars = 4;
    component.match();
    expect(cookieService.set).toHaveBeenCalledWith('matchCity', 'Cluj');
    expect(cookieService.set).toHaveBeenCalledWith('matchCounty', 'Dej');
    expect(cookieService.set).toHaveBeenCalledWith('matchSubject', 'Romanian');
    expect(cookieService.set).toHaveBeenCalledWith('matchMeeting', 'Face-To-Face');
    expect(cookieService.set).toHaveBeenCalledWith('matchStars', '4');
    expect(cookieService.set).toHaveBeenCalledTimes(5);
    expect(router.navigate).toHaveBeenCalledWith(['/mentors']);
  });


  it('should match - just 2 selected fields - and navigate', () => {
    const cookieService = TestBed.inject(CookieService);
    const router = TestBed.inject(Router);
    spyOn(cookieService, 'set').and.stub();
    spyOn(router, 'navigate').and.stub();
    component.model = {
      county: '',
      subjects: 'Chemistry',
      city: '',
      meetingType: 'Online',
      stars: 0,
    };
    component.stars = 0;
    component.match();
    expect(cookieService.set).toHaveBeenCalledWith('matchCity', '');
    expect(cookieService.set).toHaveBeenCalledWith('matchCounty', '');
    expect(cookieService.set).toHaveBeenCalledWith('matchSubject', 'Chemistry');
    expect(cookieService.set).toHaveBeenCalledWith('matchMeeting', 'Online');
    expect(cookieService.set).toHaveBeenCalledWith('matchStars', '0');
    expect(cookieService.set).toHaveBeenCalledTimes(5);
    expect(router.navigate).toHaveBeenCalledWith(['/mentors']);
  });


  it('should handle type changed', () => {
    const newValue = 'Face-To-Face';
    component.onTypeChanged(newValue);
    expect(component.displayType).toBe('block');

    const otherValue = 'Online';
    component.onTypeChanged(otherValue);
    expect(component.displayType).toBe('none');
  });
});
