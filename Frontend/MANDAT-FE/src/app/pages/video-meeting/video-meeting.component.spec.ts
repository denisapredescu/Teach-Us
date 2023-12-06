import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { VideoMeetingComponent } from './video-meeting.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('VideoMeetingComponent', () => {
  let component: VideoMeetingComponent;
  let fixture: ComponentFixture<VideoMeetingComponent>;
  let router: Router;
  let domain: String;

  beforeEach(async () => {
    domain = "meet.jit.si"; 

    await TestBed.configureTestingModule({
      declarations: [ VideoMeetingComponent ],
      imports: [
        RouterTestingModule,
        RouterTestingModule.withRoutes([])
      ]
    })
    .compileComponents();

    router = TestBed.get(Router);
    fixture = TestBed.createComponent(VideoMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get nume from localStorage', fakeAsync(() => {
    let nume = "student";
    spyOn(localStorage, "getItem").and.returnValue(nume);
    spyOn(sessionStorage, "getItem");
    
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component.nume).toBe(nume);
    expect(localStorage.getItem).toHaveBeenCalledWith("Nume");
    expect(sessionStorage.getItem).not.toHaveBeenCalled();
  }));

  it('should get email from sessionStorage', fakeAsync(() => {
      let nume = "student";
      spyOn(localStorage, "getItem").and.returnValue(null);
      spyOn(sessionStorage, "getItem").and.returnValue(nume);
      
      component.ngOnInit();
      tick();
      fixture.detectChanges();

      expect(component.nume).toBe(nume);
      expect(localStorage.getItem).toHaveBeenCalledWith("Nume");
      expect(sessionStorage.getItem).toHaveBeenCalledWith("Nume");
  }));

  it('shiuld initialize default data in init function', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component.isAudioMuted).toBe(false);
    expect(component.isVideoMuted).toBe(false);
    expect(component.domain).toBe("meet.jit.si");
  }));
});
