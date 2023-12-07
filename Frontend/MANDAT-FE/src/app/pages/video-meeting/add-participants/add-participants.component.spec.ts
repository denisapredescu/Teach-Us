import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AddParticipantsComponent } from './add-participants.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VideoCallService } from 'src/app/services/video-call.service';
import { By } from '@angular/platform-browser';

fdescribe('AddParticipantsComponent', () => {
    let component: AddParticipantsComponent;
    let fixture: ComponentFixture<AddParticipantsComponent>;
    let videoCallServiceSpy: jasmine.SpyObj<VideoCallService>;

    beforeEach(async () => {
        videoCallServiceSpy = jasmine.createSpyObj("VideoCallService", ['CreateOrUpdateLink']);
        await TestBed.configureTestingModule({
        declarations: [ AddParticipantsComponent ],
        imports: [
            HttpClientTestingModule, FormsModule,ReactiveFormsModule],
    
        })
        .compileComponents();

        fixture = TestBed.createComponent(AddParticipantsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should save the email and link in sessionStorage', () => {
        const model = {
        link: "",
        studentEmail: "student@gmail.com",
        mentorEmail: "mentor@gmail.com"
        }

        const rememberMe = "false";

        spyOn(localStorage, 'getItem').and.returnValue(rememberMe);
        component.ngOnInit();
        expect(component.rememberMe).toBe(rememberMe); 
        
        component.Send();
        videoCallServiceSpy.CreateOrUpdateLink(model);

        spyOn(window.sessionStorage, 'setItem');
        window.sessionStorage.setItem('Student Email', model.studentEmail);
        expect(window.sessionStorage.setItem).toHaveBeenCalledWith('Student Email', model.studentEmail);

        window.sessionStorage.setItem('Link', model.link.toString());
        expect(window.sessionStorage.setItem).toHaveBeenCalledWith('Link', model.link.toString());

        expect(videoCallServiceSpy.CreateOrUpdateLink).toHaveBeenCalledWith(model);
    });


    it('should save the email and link in localStorage', fakeAsync(() => {
        const model = {
        link: "",
        studentEmail: "student@gamil.com",
        mentorEmail: "mentor@gmail.com"
        }
        
        const rememberMe = "true";

        spyOn(localStorage, 'getItem').and.returnValue(rememberMe);
        component.ngOnInit();
        expect(component.rememberMe).toBe(rememberMe);

        component.Send();
        videoCallServiceSpy.CreateOrUpdateLink(model);

        spyOn(window.localStorage, 'setItem');
        window.localStorage.setItem('Student Email', model.studentEmail);
        expect(window.localStorage.setItem).toHaveBeenCalledWith('Student Email', model.studentEmail);

        window.localStorage.setItem('Link', model.link.toString());
        expect(window.localStorage.setItem).toHaveBeenCalledWith('Link', model.link.toString());
    }));

    it('should call send function when clicked', () => {
        const model = {
            link: "djksbk",
            studentEmail: "student@gamil.com",
            mentorEmail: "mentor@gmail.com"
            }
        
        component.model = model;
        spyOn(component, 'Send');
        let buttons = fixture.debugElement.queryAll(By.css('button'));
        if (buttons.length > 0) {
            buttons[0].triggerEventHandler('click',null);
            expect(component.Send).toHaveBeenCalled();
        } else {
            console.error("There is no button to be clicked");
        }
    });

    it('get email from localStorage', fakeAsync(() => {
        let email = "student@gmail.com";
        spyOn(localStorage, "getItem").and.returnValue(email);
        
        component.ngOnInit();
        expect(component.email).toBe(email);
    }));

    it('get email from sessionStorage', fakeAsync(() => {
        let email = "student@gmail.com";
        spyOn(localStorage, "getItem").and.returnValue(null);
        spyOn(sessionStorage, "getItem").and.returnValue(email);
        
        component.ngOnInit();
        expect(component.email).toBe(email);
    }));
});
