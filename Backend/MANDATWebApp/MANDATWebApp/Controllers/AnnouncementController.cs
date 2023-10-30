using MANDAT.BusinessLogic.Interfaces;
using MANDAT.Common.DTOs;
using MANDAT.Entities.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MANDATWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnnouncementController : ControllerBase
    {
        private readonly IAnnouncementManager announcementManager;
        public AnnouncementController(IAnnouncementManager announcementManager)
        {
            this.announcementManager = announcementManager;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllAnnouncements()
        {
            var announcementList = announcementManager.GetAllAnnouncements();
            return Ok(announcementList);
        }

        [HttpGet("getAllAnnouncementByMentorId/{mentorId}")]
        public async Task<IActionResult> GetAllAnnouncementByMentorId([FromRoute] Guid mentorId)
        {
            var announcement = announcementManager.GetAllAnnouncementByMentorId(mentorId);
            return Ok(announcement);
        }

        [HttpGet("getAllAnnouncementByEmail/{email}")]
        public async Task<IActionResult> GetAllAnnouncementByEmail([FromRoute] string email)
        {
            var announcement = announcementManager.GetAllAnnouncementByEmail(email);
            return Ok(announcement);
        }


        [HttpGet("bySubject/{subject}")]
        public async Task<IActionResult> GetAllAnnouncementBySubject([FromRoute] string subject)
        {
            var announcement = announcementManager.GetAllAnnouncementBySubject(subject);
            return Ok(announcement);
        }

        [HttpGet("byPrice/{price}")]
        public async Task<IActionResult> GetAllAnnouncementByPrice([FromRoute] int price)
        {
            var announcement = announcementManager.GetAllAnnouncementByPrice(price);
            return Ok(announcement);
        }

        [HttpGet("byMeetingType/{meetingType}")]
        public async Task<IActionResult> GetAllAnnouncementByType([FromRoute] bool meetingType)
        {
            var announcement = announcementManager.GetAllAnnouncementByType(meetingType);
            return Ok(announcement);
        }



        [HttpPut]
        public async Task<IActionResult> UpdateAnnouncement(Guid Id, [FromBody] UpdateAnnouncementDto updateAnnouncementDto)
        {
            var result = announcementManager.Update(Id, updateAnnouncementDto);
            return Ok(result);
        }

        [HttpDelete]
        public IActionResult DeleteAnnouncement(Guid id)
        {
            var result = announcementManager.DeleteAnnouncement(id);
            return Ok(result);
        }

        [HttpPost]
        public IActionResult CreateAnnouncement(CreateAnnouncementDto createAnnouncementDto)
        {
            var result = announcementManager.Create(createAnnouncementDto);
            return Ok(result);
        }

        [HttpPost("create-with-email")]
        public IActionResult CreateAnnouncementWithEmail(CreateAnnouncementWithEmailDto createAnnouncementWithEmailDto)
        {
            var result = announcementManager.CreateWithEmail(createAnnouncementWithEmailDto);
            return Ok(result);
        }
    }
}
