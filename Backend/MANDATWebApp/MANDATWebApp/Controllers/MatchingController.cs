using MANDAT.BusinessLogic.Interfaces;
using MANDAT.BusinessLogic.Services;
using MANDAT.Common.DTOs;
using MANDATWebApp.Code.Base;
using Microsoft.AspNetCore.Mvc;

namespace MANDATWebApp.Controllers
{
    public class MatchingController : BaseController
    {
        private readonly IMatchingService _matchingService;
        private readonly IUserManager _userAccountService;

        public MatchingController(ControllerDependencies dependencies,
            IMatchingService matchingService,
            IUserManager userAccountService) 
            : base(dependencies)
        {
            _matchingService = matchingService; 
            _userAccountService = userAccountService;
        }

        [HttpPost("CreateMatch/{emailMentor}/{emailStudent}/{subject}")]
        public IActionResult CreateMatch( string emailMentor, string emailStudent, string subject)
        {
            var mentorId = _userAccountService.GetUserByTheEmail(emailMentor);
            var studentId = _userAccountService.GetUserByTheEmail(emailStudent);

            var result = _matchingService.NewMatching(mentorId, studentId, subject);
            return Ok(result);
        }

        [HttpGet("AcceptedRequest")]

        public List<ViewStudentMatchDTO> ViewStudentAcceptedRequests(Guid studentId)
        {
            var result = _matchingService.AcceptedRequests(studentId);
            return result;
        }

        [HttpGet("RejectedRequest")]

        public List<ViewStudentMatchDTO> ViewStudentRejectedRequests(Guid studentId)
        {
            var result = _matchingService.RejectedRequests(studentId);
            return result;
        }

        [HttpGet("ViewStudentWaitingRequests/{studentId}")]

        public List<ViewStudentMatchDTO> ViewStudentWaitingRequests(Guid studentId)
        {
            var result = _matchingService.InWaitingRequests(studentId);
            return result;
        }

        [HttpGet("AllRequests/{email}")]

        public List<ViewMentorMatchDTO> AllRequests(string email)
        {
            var result = _matchingService.AllMentorRequests(email);
            return result;
        }


        [HttpGet("MentorAcceptedRequest")]

        public List<ViewMentorMatchDTO> ViewMentorAcceptedRequests(Guid mentorId)
        {
            var result = _matchingService.MentorAcceptedRequests(mentorId);
            return result;
        }

        [HttpGet("MentorRejectedRequest/{email}")]


        public List<ViewMentorMatchDTO> ViewMentorRejectedRequests(string email)
        {
            var result = _matchingService.MentorRejectedRequests(email);
            return result;
        }

        [HttpGet("ViewMentorWaitingRequests/{email}")]

        public List<ViewMentorMatchDTO> ViewMentorWaitingRequests(string email)
        {
            var result = _matchingService.MentorInWaitingRequests(email);
            return result;
        }

        [HttpPatch("RespondToRequests/{mentorEmail}, {studentEmail}, {response}/{subject}")]
        public IActionResult RespondToRequests(string mentorEmail, string studentEmail, bool response, string subject)
        {
            var result = _matchingService.RespondToRequests(mentorEmail, studentEmail, response, subject);
            return Ok(result);
        }


        [HttpDelete]
        public IActionResult DeleteRequests(Guid mentorId, Guid studentId, string subject)
        {
            var result = _matchingService.DeleteRequests(mentorId, studentId, subject);
            return Ok(result);
        }

        [HttpGet("MatchedStudent/{mentorEmail}")]
        public List<string> GetAllMatchingStudents(string mentorEmail)
        {
            var result = _matchingService.GetAllMatchingStudents(mentorEmail);
            return result;
        }

        [HttpGet("MatchedTeachersSubject/{studentEmail}")]
        public List<MentorsSubjectDTO> GetAllMatchingMentorsSubject(string studentEmail)
        {
            var result = _matchingService.GetAllMatchingMentorsSubject(studentEmail);
            return result;
        }

    }
}
