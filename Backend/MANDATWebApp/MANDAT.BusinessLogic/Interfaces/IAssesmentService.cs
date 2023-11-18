using MANDAT.BusinessLogic.Base;
using MANDAT.BusinessLogic.Models;
using MANDAT.Common.DTOs;
using MANDAT.Entities.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.BusinessLogic.Interfaces
{
    public interface IAssesmentService
    {
        byte[] ConvertFileToByteArray(IFormFile file);
        Assessment NewAssessment(CreateAssesmentDTO assesmentDTO);

        Task<bool> DeleteAssessment(Guid id);

       // Task<AssesmentViewDTO> GetAssesments(Guid id);

        List<AssesmentViewDTO> GetAssessmentByStudent(string studentEmail, string subject);

        List<AssesmentViewDTO> GetAssessmentByStudentTeacher(string studentEmail, string mentorEmail, string subject);

        bool CheckAssessment( Guid assesmentId, bool check);

        bool AddDoneAssessment( Guid assesmentId, IFormFile pdf);

        /*   List<ViewMentorReview> ViewMentorReviewsDesc(Guid mentorId);
           List<ViewMentorReview> ViewMentorReviewsAsc(Guid mentorId);
           List<ViewStudentReview> ViewStudentReviewsDesc(Guid studentId);
           List<ViewStudentReview> ViewStudentReviewsAsc(Guid studentId); Review NewReview(NewReviewModel reviewModel);
           Task<bool> DeleteReview(Guid id);
           List<ViewMentorReview> ViewMentorReviewsDesc(Guid mentorId);
           List<ViewMentorReview> ViewMentorReviewsAsc(Guid mentorId);
           List<ViewStudentReview> ViewStudentReviewsDesc(Guid studentId);
           List<ViewStudentReview> ViewStudentReviewsAsc(Guid studentId); */
    }
}
