using MANDAT.Common.DTOs;
using MANDAT.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.BusinessLogic.Interfaces
{
    public interface IVideoCallService
    {
        VideoMeetingDetails AddOrUpdateJitsiLink(VideoCallDTO model);
        List<StudentVideoCallInfoDTO> GetStudentVideoCallInfo(string studentEmail);

    }
}
