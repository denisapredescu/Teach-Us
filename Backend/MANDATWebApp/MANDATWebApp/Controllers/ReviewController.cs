using MANDAT.BusinessLogic.Interfaces;
using MANDAT.BusinessLogic.Models;
using MANDAT.BusinessLogic.Services;
using MANDATWebApp.Code.Base;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MANDATWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : BaseController 
    {
        private readonly IReview _review;
        private readonly IUserManager _userAccountService;
        public ReviewController(ControllerDependencies dependencies, IReview review, IUserManager userManager)
          : base(dependencies)
        {
            _review = review;
            _userAccountService = userManager;
        }

        /*[HttpGet("ViewMentorsReview/{id}/{asc}")]
        public List<ViewMentorReview> ViewMentorsReview([FromRoute] Guid id, bool asc) 
        {
            var result = new List<ViewMentorReview>();
            if (asc)
            {
                 result = _review.ViewMentorReviewsAsc(id);
            }
            else
            {
                 result = _review.ViewMentorReviewsDesc(id);
            }
            return result;
        }*/
        [HttpGet("ViewMentorsReview/{email}")]
        public List<ViewMentorReview> ViewMentorsReview([FromRoute] string email, bool asc)
        {
            var id = _userAccountService.GetUserByTheEmail(email);
            var result = new List<ViewMentorReview>();
            if (asc)
            {
                result = _review.ViewMentorReviewsAsc(id);
            }
            else
            {
                result = _review.ViewMentorReviewsDesc(id);
            }
            return result;
        }

        [HttpGet("ViewAllStudentReviews/{email}")]
        public List<ViewStudentReviewWithId> ViewAllStudentReviews([FromRoute] string email)
        {
            var id = _userAccountService.GetUserByTheEmail(email);
            var result = new List<ViewStudentReviewWithId>();
            result = _review.ViewAllStudentReviewsDesc(id);
            return result;
        }

        [HttpGet("ViewAllMentorReviews/{email}")]
        public List<ViewMentorReviewWithId> ViewAllMentorReviews([FromRoute] string email)
        {
            var id = _userAccountService.GetUserByTheEmail(email);
            var result = new List<ViewMentorReviewWithId>();
            result = _review.ViewAllMentorReviewsDesc(id);
            return result;
        }


        /*[HttpGet("ViewStudentsReview")]
        public List<ViewStudentReview> ViewStudentsReview(Guid id, bool asc)
        {
            var result = new List<ViewStudentReview>();
            if (asc)
            {
                result = _review.ViewStudentReviewsAsc(id);
            }
            else
            {
                result = _review.ViewStudentReviewsDesc(id);
            }
            return result;
        }*/
        [HttpGet("ViewStudentsReview/{email}")]
        public List<ViewStudentReview> ViewStudentsReview([FromRoute] string email, bool asc)
        {
            var id = _userAccountService.GetUserByTheEmail(email);
            var result = new List<ViewStudentReview>();
            if (asc)
            {
                result = _review.ViewStudentReviewsAsc(id);
            }
            else
            {
                result = _review.ViewStudentReviewsDesc(id);
            }
            return result;
        }

        [HttpGet]
        public double MentorAverageRating(Guid id)
        {
            var result = _review.GetMentorStarsAverageRating(id);
            return result;
        }

        [HttpGet("MentorStars/{email}")]
        public double MentorAverageRatingGood([FromRoute]string email)
        {
            var id = _userAccountService.GetUserByTheEmail(email);
            var result = _review.GetMentorStarsAverageRatingGood(id);
            return result;
        }

        [HttpGet("StudentStars/{email}")]
        public double StudentAverageRating([FromRoute] string email)
        {
            var id = _userAccountService.GetUserByTheEmail(email);
            var result = _review.GetStudentStarsAverageRating(id);
            return result;
        }

        [HttpPost]
        public IActionResult AddReview(NewReviewModel reviewModel)
        {
            var result =  _review.NewReview(reviewModel);
            return Ok(result);
        }

        [HttpDelete]
        public IActionResult DeleteReviewAsync(Guid id)
        {
            var result = _review.DeleteReview(id);
            return Ok(result); 
        }

        [HttpPatch("editReview/{id},{message}")]
        public IActionResult EditReview([FromRoute] Guid id, string message)
        {
            if(message == null)
            {
                return BadRequest();
            }
            var result = _review.EditReviewComment(id, message);
            return Ok(result);
        }

    }
}
