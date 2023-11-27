export interface AssessmentModel {
mentorEmail: string;
studentEmail: string;
assessmentDeadline:  Date;
subject: string;
text: string;
mentorPdf: File | null;


}