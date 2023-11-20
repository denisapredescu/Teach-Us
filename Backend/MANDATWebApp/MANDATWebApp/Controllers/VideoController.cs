using MANDAT.BusinessLogic.Interfaces;
using MANDAT.Common.DTOs;
using MANDAT.Entities.Entities;
using MANDATWebApp.Code.Base;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MANDATWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : BaseController
    {
        private readonly IVideoManager _video;
        public VideoController(ControllerDependencies dependencies,IVideoManager video) : base(dependencies)
        {
            _video = video;
        }

        [HttpPost]
        public IActionResult NewVideo(CreateVideoDto model)
        {
            var result = _video.NewVideo(model);
            return Ok(result);
        }

        [HttpGet("VideoForStudent/{studentEmail}, {mentorEmail} {subject}")]
        public List<YoutubeVideoCodeDTO> GetVideoForStudent(string studentEmail, string mentorEmail, string subject)
        {
            var result = new List<YoutubeVideoCodeDTO>();

            result = _video.GetVideoForStudent(studentEmail, mentorEmail, subject);
            return result;
        }
    }
}
