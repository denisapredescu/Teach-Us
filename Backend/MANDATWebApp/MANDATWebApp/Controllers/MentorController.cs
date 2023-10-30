using MANDAT.BusinessLogic.Interfaces;
using MANDAT.Common.DTOs;
using MANDAT.Entities.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;
using System.ComponentModel;
using System.Globalization;

namespace MANDATWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MentorController : ControllerBase
    {
        private readonly IMentorManager mentorManager;
        private readonly IUserManager _userAccountService;
        private readonly IReview _review;
        public MentorController(IMentorManager mentorManager, 
                                IUserManager userAccountService,
                                IReview review)
        {
            this.mentorManager = mentorManager;
            _userAccountService = userAccountService;
            _review = review;
        }
        [HttpGet("mentors")]
        public async Task<IActionResult> GetAllMentors()
        {
            var mentorList = mentorManager.GetAllMentors();
            foreach (var mentor in mentorList)
            {
                mentor.NumberOfStars = _review.GetMentorStarsAverageRatingByEmail(mentor.Email);
            }
            return Ok(mentorList);
        }

        [HttpGet("byEmailViewMentAdm/{email}")]
        public async Task<IActionResult> GetMentorByEmailMentorAdminView([FromRoute] String email)
        {
            var mentorId = _userAccountService.GetUserByTheEmail(email);
            var mentor = mentorManager.GetMentorByIdForMentorAdminView(mentorId);
            return Ok(mentor);
        }


        [HttpGet("byEmailViewStud/{email}")]
        public async Task<IActionResult> GetMentorByEmailStudView([FromRoute] String email)
        {
            var mentorId = _userAccountService.GetUserByTheEmail(email);
            var mentor = mentorManager.GetMentorByIdForStudentView(mentorId);
            return Ok(mentor);
        }

        [HttpGet("byName/{name}")]///////////  !!!!
        public List<MentorByIdViewByStudentDTO> GetMentorByHisName([FromRoute] string name)
        {
            var mentor = mentorManager.GetMentorByName(name);
            return mentor;
        }

        [HttpGet("byIdLocation/{locationId}")]
        public async Task<IActionResult> GetMentorsByTheLocation([FromRoute] Guid locationId)
        {
            var mentors = mentorManager.GetMentorsByLocation(locationId);
            return Ok(mentors);
        }

        [HttpGet("mentorsLocations")]
        public async Task<IActionResult> GetMentorsByLocations()
        {
            var mentors = mentorManager.GetMentorsLocations();
            return Ok(mentors);
        }

        [HttpGet("studentsByEmailMentor/{email}")]
        public async Task<IActionResult> GetAllStudentsForMentorEmail([FromRoute] String email)
        {
            var mentorId = _userAccountService.GetUserByTheEmail(email);
            var students = mentorManager.GetStudentsForMentor(mentorId);
            return Ok(students);
        }

        /*        [HttpGet("phone")]// do not need
                public async Task<IActionResult> GetMentorPhoneNumber(Guid studentId, Guid mentorId)
                {
                    var result = mentorManager.GetMentorPhoneNumber(studentId, mentorId);
                    return Ok(result);
                }*/

        [HttpPut("mentorUpdate/{email}")]
        public async Task<IActionResult> UpdateMentor([FromRoute] String email, [FromBody] MentorUpdateDTO mentorUpdateDTO)
        {
            var mentorId = _userAccountService.GetUserByTheEmail(email);
            var result = mentorManager.Update(mentorId, mentorUpdateDTO);
            return Ok(result);
        }

        [HttpPut("mentorItems/{email}")]
        public async Task<IActionResult> UpdateMentorItems([FromRoute] String email, [FromBody] MentorUpdateItemsDTO mentorUpdateItemsDTO)
        {
            var mentorId = _userAccountService.GetUserByTheEmail(email);
            var result = mentorManager.UpdateMentor(mentorId, mentorUpdateItemsDTO);
            return Ok(result);
        }

        [HttpPatch("mentorDelete/{email}")]
        public IActionResult EditReview(String email, bool isDeleted)
        {
            var mentorId = _userAccountService.GetUserByTheEmail(email);
            var result = mentorManager.ManagerIsDeleted(mentorId, isDeleted);
            return Ok(result);
        }

    }
}
