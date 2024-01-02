using MANDAT.BusinessLogic.Interfaces;
using MANDAT.BusinessLogic.Models;
using MANDAT.Common.DTOs;
using MANDAT.Entities.Entities;
using MANDATWebApp.Code.Base;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MANDATWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssessmentsController : BaseController 
    {
        private readonly IAssesmentService _assesment;
        public AssessmentsController(ControllerDependencies dependencies, IAssesmentService assesment)
          : base(dependencies)
        {
            _assesment = assesment;
        }

        [HttpPost]
        public IActionResult NewAssessment([FromForm] CreateAssesmentDTO assessmentModel)
        {
            var result = _assesment.NewAssessment(assessmentModel);
            return Ok(result);
        }

        [HttpGet("GetAssessmentByStudent/{studentEmail}, {subject}")]
        public List<AssesmentViewDTO> GetAssessmentByStudent([FromRoute] string studentEmail, string subject)
        {
            var result = new List<AssesmentViewDTO>();
     
                result = _assesment.GetAssessmentByStudent(studentEmail, subject);
                return result;
        }

        [HttpGet("GetAssessmentByStudentTeacher/{studentEmail}, {mentorEmail} {subject}")]
        public List<AssesmentViewDTO> GetAssessmentByStudentTeacher(string studentEmail, string mentorEmail, string subject)
        {
            var result = new List<AssesmentViewDTO>();

            result = _assesment.GetAssessmentByStudentTeacher(studentEmail, mentorEmail.Split(',')[0], subject);
            return result;
        }


        [HttpDelete]
        public async Task<IActionResult> DeleteAssessmentAsync(Guid idAssessment)
        {
            if (!await _assesment.DeleteAssessment(idAssessment))
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpPatch("checkAssessment")]
        public IActionResult CheckAssessment([FromForm] Guid assessmentId, [FromForm] bool check)
        {
        
            var result = _assesment.CheckAssessment(assessmentId, check);
            return Ok(result);
        }


        [HttpPatch("addDoneAssessment")]
        public IActionResult AddDoneAssessment([FromForm] Guid assessmentId, [FromForm] IFormFile studentPdf)
        {
            if (studentPdf == null)
            {
                return BadRequest();
            }
            var result = _assesment.AddDoneAssessment(assessmentId, studentPdf);
            return Ok(result);
        }
    }
}
