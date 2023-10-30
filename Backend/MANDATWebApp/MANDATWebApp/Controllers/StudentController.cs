using MANDAT.BusinessLogic.Interfaces;
using MANDAT.Common.DTOs;
using MANDAT.DataAccess;
using MANDAT.Entities.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;
using System.Globalization;

namespace MANDATWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentManager _studentManager;
        private readonly IUserManager _userAccountService;
        private readonly IReview _review;
        public StudentController(
            IStudentManager studentManager,
            IUserManager userAccountService,
            IReview review
            )
        {
            _studentManager = studentManager;
            _userAccountService = userAccountService;
            _review = review;
        }

        [HttpGet("GetAllStudents")]
        public async Task<IActionResult> GetAllStudents()
        {
            var students = _studentManager.GetAllStudents();
            return Ok(students);
        }

        [HttpGet("GetStudentByEmail/{email}")]
        public async Task<IActionResult> GetStudentByEmail([FromRoute] String email)
        {
            var studentId = _userAccountService.GetUserByTheEmail(email);
            var student = _studentManager.GetStudentById(studentId);
            return Ok(student);
        }


        [HttpGet("GetStudentsByName/{name}")]
        public async Task<IActionResult> GetStudentsByName([FromRoute] String name)
        {
            var student = _studentManager.GetStudentsByName(name);
            return Ok(student);
        }

        [HttpGet("GetStudentsByLocation/{locationId}")]
        public async Task<IActionResult> GetStudentsByLocation([FromRoute] Guid locationId)
        {

            var students = _studentManager.GetStudentsByLocation(locationId);
            return Ok(students);
        }

        [HttpGet("GetMentorsForStudent/{email}")]
        public async Task<IActionResult> GetMentorsForStudent([FromRoute] String email)
        { 
            var studentId = _userAccountService.GetUserByTheEmail(email);
            var mentors = _studentManager.GetMentorsForStudent(studentId);
            return Ok(mentors);
        }

        [HttpGet("GetMentorPhoneNumber/{studentEmail}/{mentorEmail}")]
        public async Task<IActionResult> GetMentorPhoneNumber([FromRoute] String studentEmail, String mentorEmail)
        {
            var studentId = _userAccountService.GetUserByTheEmail(studentEmail);
            var mentorId = _userAccountService.GetUserByTheEmail(mentorEmail);
            var phoneNumber = _studentManager.GetMentorPhoneNumber(studentId, mentorId);
            return Ok(phoneNumber);
        }

        [HttpPut("UpdateStudent/{email}")]
        public async Task<IActionResult> UpdateStudent([FromRoute] String email, [FromBody] StudentDTO student)
        {
            var studentId = _userAccountService.GetUserByTheEmail(email);
            var updatedStudent = _studentManager.Update(studentId, student);
            return Ok(updatedStudent);
        }

        //[HttpPut("UpdateStudentLocation")]
        //public async Task<IActionResult> UpdateStudentLocation(Guid studentId, StudentDTO student)
        //{
        //    var updatedStudent = _studentManager.UpdateStudentLocation(studentId, student);
        //    return Ok(updatedStudent);
        //}



        [HttpPatch("SoftDelete/{email}")]
        public IActionResult SoftDelete([FromRoute] String email, [FromBody] StudentDTO student)
        {
            var studentId = _userAccountService.GetUserByTheEmail(email);
            var result = _studentManager.SoftDelete(studentId);
            return Ok(result);
        }
    }
}
