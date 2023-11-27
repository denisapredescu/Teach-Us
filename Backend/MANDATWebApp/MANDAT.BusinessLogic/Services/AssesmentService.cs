using MANDAT.BusinessLogic.Base;
using MANDAT.BusinessLogic.Interfaces;
using MANDAT.BusinessLogic.Models;
using MANDAT.Common.DTOs;
using MANDAT.Entities.Entities;
using MANDAT.Entities.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace MANDAT.BusinessLogic.Services
{
    public class AssesmentService : BaseService, IAssesmentService
    {
        public AssesmentService(ServiceDependencies dependencies) : base(dependencies) { }

        public byte[] ConvertFileToByteArray(IFormFile file)
        {
            using (var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);
                return memoryStream.ToArray();
            }
        }
        public Assessment NewAssessment(CreateAssesmentDTO assesmentDTO)
        {
            return ExecuteInTransaction(uow =>
            {
                
                var student = uow.Students.Get().FirstOrDefault(s => s.User.Email == assesmentDTO.StudentEmail);
                var mentor = uow.Mentors.Get().FirstOrDefault(s => s.User.Email == assesmentDTO.MentorEmail);
                var assesment = new Assessment();
                if (assesmentDTO.MentorPdf != null)
                {
                    assesment.MentorPdf = ConvertFileToByteArray(assesmentDTO.MentorPdf);
                    assesment.StudentPdf = ConvertFileToByteArray(assesmentDTO.MentorPdf);
                }
                assesment.AssessmentId = Guid.NewGuid();
                assesment.StudentId = student.Id;
                assesment.MentorId = mentor.Id;
                assesment.AssessmentDeadline = assesmentDTO.AssessmentDeadline;
                assesment.AssessmentCreationDate = DateTime.UtcNow;
                assesment.checkStatus = false;
                assesment.Text = assesmentDTO.Text;
                assesment.Subject = assesmentDTO.Subject;
                uow.Assessments.Insert(assesment);
                uow.SaveChanges();
                return assesment;
            });
        }

        public async Task<bool> DeleteAssessment(Guid id)
        {

            return ExecuteInTransaction(uow =>
            {

                var ass = uow.Assessments.Get()
                                                .Where(cd => cd.AssessmentId.Equals(id))
                                                .Single();
                if (ass == null)
                {
                    return false;
                }
                uow.Assessments.Delete(ass);
                uow.SaveChanges();
                return true;

            });
        }

        public List<AssesmentViewDTO> GetAssessmentByStudent(string studentEmail,  string subject)
        {
            return ExecuteInTransaction(uow =>
            {
                var studentId = uow.Students.Get().FirstOrDefault(s => s.User.Email == studentEmail).Id;

                var assesm = uow.Assessments
                                .Get()
                                .Include(m => m.Mentor)
                                .Include(s => s.Student)
                                .Where(assesment => assesment.StudentId.Equals(studentId) && assesment.Subject.Equals(subject))//.Where(assesment => assesment.StudentId.Equals(studentId) && assesment.Status.Equals("1"))//
                                .Select(assesment => new AssesmentViewDTO
                                {
                                    AssessmentId = assesment.AssessmentId,
                                    MentorEmail = assesment.Mentor.User.Email,
                                    StudentEmail = studentEmail,
                                    AssessmentDeadline = assesment.AssessmentDeadline,
                                    Check = assesment.checkStatus,
                                    Text = assesment.Text,
                                    MentorPdf = assesment.MentorPdf,
                                    StudentPdf = assesment.StudentPdf,
                                    Materie = assesment.Subject
                                })
                                .ToList();
                var result = assesm.OrderByDescending(o => o.AssessmentDeadline).ToList();
                return result;
            });
        }
        public  List<AssesmentViewDTO> GetAssessmentByStudentTeacher(string studentEmail, string mentorEmail, string subject)
        {
            return ExecuteInTransaction(uow =>
            {
                 var studentId = uow.IdentityUsers.Get().Where(s => s.Email.Equals(studentEmail)).Select(s => s.Id).Single();
                var mentorId = uow.IdentityUsers.Get().Where(s => s.Email.Equals(mentorEmail)).Select(s => s.Id).Single();

                var assesm = uow.Assessments
                                .Get()
                                .Include(m => m.Mentor)
                                .Include(s => s.Student)
                                .Where(assesment => assesment.StudentId.Equals(studentId) && assesment.MentorId.Equals(mentorId) && assesment.Subject.Equals(subject))//.Where(assesment => assesment.StudentId.Equals(studentId) && assesment.Status.Equals("1"))//
                                .Select(assesment => new AssesmentViewDTO
                                {
                                    AssessmentId = assesment.AssessmentId,
                                    MentorEmail = mentorEmail,
                                    StudentEmail = studentEmail,
                                    AssessmentDeadline = assesment.AssessmentDeadline,
                                    Check = assesment.checkStatus,
                                    Text = assesment.Text,
                                    MentorPdf = assesment.MentorPdf,
                                    StudentPdf = assesment.StudentPdf,
                                    Materie = assesment.Subject
                                })
                                .ToList();
                var result = assesm.OrderByDescending(o => o.AssessmentDeadline).ToList();  
            return result;
        });
        }
        public bool CheckAssessment( Guid assesmentId, bool check)
        {
    
            return ExecuteInTransaction(db =>
            {
               
                var assessment = db.Assessments.Get().Where(sr => sr.AssessmentId.Equals(assesmentId)).SingleOrDefault();
                if (assessment == null)
                {
                    return false;
                }
                else
                {
                    assessment.checkStatus = check;
                    db.Assessments.Update(assessment);
                    db.SaveChanges();
                    return true;
                }
            });

        }


        public bool AddDoneAssessment( Guid assesmentId, IFormFile pdf)
        {

            return ExecuteInTransaction(db =>
            {

                var assessment = db.Assessments.Get().Where(sr => sr.AssessmentId.Equals(assesmentId)).SingleOrDefault();
                if (assessment == null)
                {
                    return false;
                }
                else
                {
                    assessment.MentorPdf = ConvertFileToByteArray(pdf);
                    db.Assessments.Update(assessment);
                    db.SaveChanges();
                    return true;
                }
            });

        }


    }
}
