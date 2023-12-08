import { HttpClient } from '@angular/common/http';
import { Binary } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';

import { HomeworkModel } from 'src/app/models/homework-model';
import { AssessmentService } from 'src/app/services/assessment.service';
@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.scss']
})
export class HomeworkComponent implements OnInit {
  public emailStudent: string = '';
  public emailMentor: string = '';
  public subject: string = '';
  public model: HomeworkModel[] = [];;
  public currentPage = 0;
  public pageFiles: File[] = [];
  public selectedFileName: string = '';
  @Input() rol: string = "";
  public addHomework: FormGroup = new FormGroup({
    
    studentPdfFile: new FormControl(null), 
  });

  constructor(private router: Router, 
              private http: HttpClient,
              private assessmentService: AssessmentService) { }

  

              ngOnInit(): void {
                this.model = [];
                this.rol = localStorage.getItem("Rol")!;
                if ( this.rol == "mentor"){
                  this.emailStudent = localStorage.getItem("EmailPersoana")!;
                  this.emailMentor = localStorage.getItem("Email")!;
                }
                else{
                  this.emailStudent = localStorage.getItem("Email")!;
                  this.emailMentor = localStorage.getItem("EmailPersoana")!;
                }
                
                this.subject = localStorage.getItem("Subject")!;
               
                this.assessmentService.getStudentAssignment(this.emailStudent, this.emailMentor, this.subject)
                  .subscribe(
                    (result: HomeworkModel[]) => {
                      this.model = result;
                      console.log(result);
              
                      if (result && result.length > 0 && result[0].materie) {
                        console.log(result[0].materie);
                      } else {
                        console.log('Materie is undefined or empty');
                      }
                    },
                    (error) => {
                      console.error('Error fetching student assignment data:', error);
                    }
                  );
      const coverPage = document.getElementById('firstpage');
    if (coverPage) {
      coverPage.classList.add('flipped');
    }

  }

onFileSelected(event: Event, pag: HomeworkModel): void {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput?.files?.[0];

  if (file) {
    this.selectedFileName = file.name;
    pag.studentPdfFile = file;

    this.pageFiles = this.pageFiles || [];
    this.pageFiles.push(file);
  }


}


saveAdd(pag: HomeworkModel, pageIndex: number): void {
  const formData = new FormData();
  const pag1 = this.model[pageIndex];
  const studentPdf = pag.studentPdfFile;

  if (studentPdf instanceof File) {
    formData.append('studentPdf', studentPdf, studentPdf.name);
  }

  this.assessmentService.addDoneAssessment(pag.assessmentId, pag.studentPdfFile).subscribe(
    (result) => {
      console.log("Done assessment");
    },
    (error) => {
      console.log(error);
    }
  );
}
  // flipPage(index: number) {
  //   if (index === 0) {
  //     const coverPage = document.getElementById('firstpage');
  //     if (coverPage) {
  //       coverPage.classList.toggle('flipped');
  //     }
  //   } else {
  //    const pageElement = document.getElementById(`page-${index}`);
  //     if (pageElement) {
  //       pageElement.classList.toggle('flipped');
  //     }
  
  //     if (index % 2 === 0) {
  //       const siblingPage = pageElement?.previousElementSibling as HTMLElement;
  //       if (siblingPage) {
  //         siblingPage.classList.toggle('flipped');
  //       }
  //     } else {
  //       const siblingPage = pageElement?.nextElementSibling as HTMLElement;
  //       if (siblingPage) {
  //         siblingPage.classList.toggle('flipped');
  //       }
  //     }
  
  //     this.currentPage = index;
  //   }
  // }
 
  openFile(binaryData: any, fileName: string) {
    const blob = new Blob([binaryData], { type: 'application/octet-stream' });
    const blobUrl = URL.createObjectURL(blob); 
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  }

  openFileStudent(assessmentId: Guid, pag: HomeworkModel): void {
  
    const arrayBuffer = this.convertBinaryToArrayBuffer(pag.studentPdf);
    const uint8Array = new Uint8Array(arrayBuffer);
    const blob = new Blob([uint8Array], { type: 'application/octet-stream' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `Homework_${this.subject}.pdf`; // You can customize the file name here
  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  }
  
  private convertBinaryToArrayBuffer(binaryData: any): ArrayBuffer {
    const buffer = new ArrayBuffer(binaryData.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < binaryData.length; i++) {
      view[i] = binaryData[i];
    }
    return buffer;
  }
  
  

  uploadFile(page: any) {

    console.log('Upload Homework File:', page);

  }
 
 
  togglePublicField(event: any, pag: HomeworkModel): void {
    const check = event.target.checked;
  
    this.assessmentService.checkAssessment(pag.assessmentId, check).subscribe(
      (result) => {
        pag.check = check; // Update the local state
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  
}
