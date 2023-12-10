import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { DialogAddAssessmentByTeacherComponent } from './dialog-add-assessment-by-teacher.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { AssessmentService } from 'src/app/services/assessment.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('DialogAddAssessmentByTeacherComponent', () => {
  let component: DialogAddAssessmentByTeacherComponent;
  let fixture: ComponentFixture<DialogAddAssessmentByTeacherComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<DialogAddAssessmentByTeacherComponent>>;
  let assessmentServiceSpy: jasmine.SpyObj<AssessmentService>;

  beforeEach(() => {
    assessmentServiceSpy = jasmine.createSpyObj('AssessmentService', ['createAssessment']);
    assessmentServiceSpy.createAssessment.and.returnValue(of('success'));
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [DialogAddAssessmentByTeacherComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: AssessmentService, useValue: assessmentServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });

    fixture = TestBed.createComponent(DialogAddAssessmentByTeacherComponent);
    component = fixture.componentInstance;
  });


  it('should initialize with default form values', () => {
    expect(component.addAssessmentForm.get('mentorEmail')!.value).toEqual('');
    expect(component.addAssessmentForm.get('studentEmail')!.value).toEqual('');
    expect(component.addAssessmentForm.get('assessmentDeadline')!.value).toEqual(jasmine.any(Date));
    expect(component.addAssessmentForm.get('subject')!.value).toEqual('');
    expect(component.addAssessmentForm.get('text')!.value).toEqual('');
    expect(component.addAssessmentForm.get('mentorPdf')!.value).toEqual(null);
  });

  it('should update form values when data is provided', () => {
    var email = localStorage.getItem("Email") !== null ? localStorage.getItem("Email") : sessionStorage.getItem("Email");
    const data = {
      email: 'test@example.com',
    };
  
    component.data = { data: data };
  
    component.ngOnInit();
  
    // expect(component.user).toEqual({ email: data.email });
    // expect(component.emailMentor).toEqual(data.email);
    // expect(component.addAssessmentForm.get('mentorEmail')!.value).toEqual(data.email);
    expect(component.user).toEqual({ email: data.email });
    expect(component.emailMentor).toEqual(email);
    expect(component.addAssessmentForm.get('mentorEmail')!.value).toEqual(email);
  });
  
  
  
  
  

  it('should handle file input change event', () => {
    const file = new File([''], 'test.pdf');
    const event: unknown = {
      target: {
        files: [new File([''], 'test.pdf')],
      },
    };
  
    component.onFileSelected(event as Event);
  
    expect(component.selectedFileName).toEqual(file.name);
    expect(component.addAssessmentForm.get('mentorPdf')!.value).toEqual(file);
  });

  it('should handle file input change event when no file is present', () => {
    const event: unknown = {
      target: {
        files: undefined,
      },
    };
  
    component.onFileSelected(event as Event);
  
    expect(component.selectedFileName).toEqual('');
    expect(component.addAssessmentForm.get('mentorPdf')!.value).toEqual(null);
  });
  

  it('should handle save when mentorPdf is not a File', fakeAsync(() => {
    const formDataSpy = spyOn(component, 'formatDateForServer').and.returnValue('2023-01-01T00:00:00.000Z');
  
    component.addAssessmentForm.get('mentorPdf')!.setValue('not-a-file');
  
    component.saveAdd();
    tick();
  
    expect(assessmentServiceSpy.createAssessment).toHaveBeenCalledWith(jasmine.any(FormData));
    expect(dialogRefSpy.close).toHaveBeenCalledWith('success');
  }));
  
  
  afterEach(() => {
    assessmentServiceSpy.createAssessment.calls.reset();
  });
  
  
  
  
  
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedFileName and update mentorPdf on file selection', () => {
    const event: unknown = {
      target: {
        files: [new File([''], 'test.pdf')],
      },
    };
  
    component.onFileSelected(event as Event);
  
    expect(component.selectedFileName).toBe('test.pdf');
    expect(component.addAssessmentForm.get('mentorPdf')!.value instanceof File).toBe(true);
  });

  it('should format date for server correctly', () => {
    const date = new Date('2023-01-01T00:00:00.000Z');
    const formattedDate = component.formatDateForServer(date);

    expect(formattedDate).toBe('2023-01-01T00:00:00.000Z');
  });

  it('should save assessment', fakeAsync(() => {
    const formDataSpy = spyOn(component, 'formatDateForServer').and.returnValue('2023-01-01T00:00:00.000Z');

    component.addAssessmentForm.patchValue({
      mentorEmail: 'mentor@test.com',
      studentEmail: 'student@test.com',
      assessmentDeadline: new Date(),
      subject: 'Mathematics',
      text: 'Tema 1',
      mentorPdf: new File([''], 'test.pdf'),
    });

    component.saveAdd();
    tick();

    expect(assessmentServiceSpy.createAssessment).toHaveBeenCalledWith(jasmine.any(FormData));
    expect(formDataSpy.calls.mostRecent().returnValue).toBe('2023-01-01T00:00:00.000Z');
    expect(dialogRefSpy.close).toHaveBeenCalledWith('success');
  }));
  
  it('should handle error when assessmentService.createAssessment fails', fakeAsync(() => {
    assessmentServiceSpy.createAssessment.and.returnValue(throwError('error')); // Use throwError to simulate an error
  
    component.saveAdd();
    tick();
  
    expect(assessmentServiceSpy.createAssessment).toHaveBeenCalledOnceWith(jasmine.any(FormData));
    // Update the following line
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  }));
  
  
});