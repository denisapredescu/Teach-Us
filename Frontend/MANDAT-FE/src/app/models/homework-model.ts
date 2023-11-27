import { Binary } from "@angular/compiler";
import { Guid } from "guid-typescript";

export interface HomeworkModel {
    assessmentId:               Guid,               
    mentorEmail:                string,
    studentEmail:               string,
    assessmentDeadline:         Date,
    materie:                    string,
    check:                      boolean,
    text:                       string,
    mentorPdf:                  Binary,
    studentPdf:                 Binary,
    index:                      number,
    studentPdfFile:             File | null,
}