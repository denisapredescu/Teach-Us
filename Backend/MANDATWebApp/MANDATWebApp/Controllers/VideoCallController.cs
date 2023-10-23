using MANDAT.BusinessLogic.Interfaces;
using MANDAT.Common.DTOs;
using MANDATWebApp.Code.Base;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MANDATWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoCallController : BaseController
    {
        private readonly IVideoCallService _videoCallService;

        public VideoCallController(IVideoCallService videoCallService, ControllerDependencies dependencies): base(dependencies)
        {
            _videoCallService = videoCallService;
        }

        [HttpGet("GetStudentVideoCallInfo/{studentEmail}")]
        public async Task<IActionResult> GetStudentVideoCallInfo(string studentEmail)
        {
            var result = _videoCallService.GetStudentVideoCallInfo(studentEmail);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddOrUpdateJitsiLink(VideoCallDTO model)
        {
            var resukt = _videoCallService.AddOrUpdateJitsiLink(model);
            return Ok(resukt);
        }
    }
}
