import { ComponentFixture, TestBed, async, fakeAsync, flushMicrotasks, tick } from '@angular/core/testing';

import { HomeworkComponent } from './homework.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { HomeworkModel } from 'src/app/models/homework-model';
import { AssessmentService } from 'src/app/services/assessment.service';
import { Guid } from 'guid-typescript';
import { AST, AbsoluteSourceSpan, Binary, ParseSpan } from '@angular/compiler';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


class CustomBinary extends Binary {
  constructor(data: Uint8Array) {
    super({} as ParseSpan, {} as AbsoluteSourceSpan, 'dummy-operation', {} as AST, {} as AST);
  }


  toBlob(): Blob {
    return new Blob([], { type: 'application/octet-stream' });
  }

  toUint8Array(): Uint8Array {
    return new Uint8Array();
  }
}


const mockBinaryData = new Uint8Array([]);
const mockMentorPdf = new CustomBinary(new Uint8Array());

fdescribe('HomeworkComponent', () => {
  let component: HomeworkComponent;
  let fixture: ComponentFixture<HomeworkComponent>;
  let assessmentService: AssessmentService;
  let dialog: MatDialog;
  let httpTestingController: HttpTestingController;

  beforeEach(async() => {
  await  TestBed.configureTestingModule({
      declarations: [HomeworkComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, MatDialogModule, HttpClientTestingModule],
      providers: [AssessmentService, MatDialog],
    });

    fixture = TestBed.createComponent(HomeworkComponent);
    component = fixture.componentInstance;
    assessmentService = TestBed.inject(AssessmentService);
    dialog = TestBed.inject(MatDialog);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
    TestBed.resetTestingModule();
  });

  it('should create HomeworkComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit and fetch student assignment data successfully', fakeAsync(() => {
    const mockHomeworkData: HomeworkModel[] = [{
      assessmentId: Guid.create(),
      mentorEmail: 'testMentor',
      studentEmail: 'testStudent',
      assessmentDeadline: new Date('2023-01-01T00:00:00.000Z'),
      materie: 'ExpectedMaterie' ,
      mentorPdf: mockMentorPdf,
      studentPdf: mockMentorPdf,
      check: false,
      text: 'ss',
      index: 0 ,
      studentPdfFile: null 
    }]; 
    component.emailStudent = 'testStudent';
    component.emailMentor = 'testMentor';
    component.subject = 'testSubject';
  
    spyOn(assessmentService, 'getStudentAssignment').and.returnValue(of(mockHomeworkData));
  
    component.ngOnInit();
    tick();
  
    expect(assessmentService.getStudentAssignment).toHaveBeenCalledWith(
      component.emailStudent,
      component.emailMentor,
      component.subject
    );
    expect(component.model).toEqual(mockHomeworkData);
    expect(component.model[0].materie).toEqual('ExpectedMaterie');}));
  
  it('should handle file selection and update selectedFileName', () => {
    const file = new File([''], 'test.pdf');
    const event: Event = {
      target: {
        files: [file],
      },
    } as unknown as Event;
    const defaultBinaryData = new Uint8Array();
    const pag: HomeworkModel = {
      assessmentId: Guid.create(),
      studentPdfFile: null,
      mentorEmail: '',
      studentEmail: '',
      assessmentDeadline: new Date(), 
      materie: '',
      check: false,
      text: '',
      mentorPdf: mockMentorPdf,
      studentPdf: mockMentorPdf,
      index: 0,
    };

    component.onFileSelected(event, pag);

    expect(component.selectedFileName).toEqual(file.name);
    expect(pag.studentPdfFile).toEqual(file);
    expect(component.pageFiles).toContain(file);

 });
  
   it('should handle saveAdd and call assessmentService.addDoneAssessment successfully', fakeAsync(() => {
    const mockResponse = 'success';
  
    const pag: HomeworkModel = {
      assessmentId: Guid.create(),
      studentPdfFile: null,
      mentorEmail: '',
      studentEmail: '',
      assessmentDeadline: new Date(), 
      materie: '',
      check: false,
      text: '',
      mentorPdf: mockMentorPdf,
      studentPdf: mockMentorPdf,
      index: 0,
    };
  
    component.saveAdd(pag, 0);
  
    const req = httpTestingController.expectOne('https://localhost:7278/api/Assessments/addDoneAssessment'); // Adjust URL
  
    req.flush(mockResponse);
  

    tick();
  

    httpTestingController.verify();
  }));


  
  it('should open file', () => {
    const mockBinaryData = new Uint8Array([1, 2, 3]);
    const fileName = 'test.pdf';
    
    spyOn(window.URL, 'createObjectURL').and.returnValue('mockBlobUrl');
    const linkSpy = spyOn(document, 'createElement').and.callThrough();
    const anchorElement: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
  
    linkSpy.and.returnValue(anchorElement);
  
    component.openFile(mockBinaryData, fileName);
  
    expect(linkSpy).toHaveBeenCalledWith('a');
    expect(anchorElement.href).toContain('mockBlobUrl');
    expect(anchorElement.download).toBe(fileName);
  });
  
  it('should open student file', () => {
    const mockBinaryData = new Uint8Array([1, 2, 3]);
    const pag: HomeworkModel = {
      assessmentId: Guid.create(),
      studentPdf: mockMentorPdf,
      mentorEmail: '',
      studentEmail: '',
      assessmentDeadline: new Date(),
      materie: '',
      text: '',
      mentorPdf: mockMentorPdf,
      index: 0,
      studentPdfFile: null,
      check: false
    };
    
    spyOn(URL, 'createObjectURL').and.returnValue('mockBlobUrl');
    const linkSpy = spyOn(document, 'createElement').and.callThrough();
    const anchorElement: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
  
    linkSpy.and.returnValue(anchorElement);
  
    component.openFileStudent(pag.assessmentId, pag);
  
    expect(linkSpy).toHaveBeenCalledWith('a');
    expect(anchorElement.href).toContain('mockBlobUrl');
    expect(anchorElement.download).toBe(`Homework_${component.subject}.pdf`);
    // Additional expectations if needed
  });
  
  it('should toggle public field', fakeAsync(() => {
    const pag: HomeworkModel = {
      assessmentId: Guid.create(),
      check: false,
      mentorEmail: '',
      studentEmail: '',
      assessmentDeadline: new Date(), 
      materie: '',
      text: '',
      mentorPdf: mockMentorPdf,
      studentPdf: mockMentorPdf,
      index: 0,
      studentPdfFile: null
    };
  
    spyOn(assessmentService, 'checkAssessment').and.returnValue(of('success'));
    
    component.togglePublicField({ target: { checked: true } }, pag);
    tick();
  
    expect(assessmentService.checkAssessment).toHaveBeenCalledWith(pag.assessmentId, true);
    expect(pag.check).toBe(true);
  }));
  
  afterEach(() => {
    httpTestingController.verify();
    // TestBed.resetTestingModule();
  });
});
