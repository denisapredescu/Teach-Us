using MANDAT.BusinessLogic.Models;
using MANDAT.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.BusinessLogic.Interfaces
{
    public interface IReview
    {
        Review NewReview(NewReviewModel reviewModel);
        List<ViewMentorReview> ViewMentorReviewsDesc(Guid mentorId);
        List<ViewMentorReview> ViewMentorReviewsAsc(Guid mentorId);
        List<ViewStudentReview> ViewStudentReviewsDesc(Guid studentId);
        List<ViewStudentReview> ViewStudentReviewsAsc(Guid studentId);
        double GetMentorStarsAverageRating(Guid id);
        double GetStudentStarsAverageRating(Guid id);
        string EditReviewComment(Guid id, string message);

        List<ViewStudentReviewWithId> ViewAllStudentReviewsDesc(Guid studentId);
        List<ViewMentorReviewWithId> ViewAllMentorReviewsDesc(Guid mentorId);
        double GetMentorStarsAverageRatingGood(Guid id);
        double GetMentorStarsAverageRatingByEmail(string email);
        double GetStudentStarsAverageRatingByEmail(string email);
        bool DeleteReview(Guid id);
    }
}
