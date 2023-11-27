using MANDAT.Common.DTOs;
using MANDAT.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.BusinessLogic.Interfaces
{
    public interface IVideoManager
    {
        Video NewVideo(CreateVideoDto videoDto);
        List<YoutubeVideoCodeDTO> GetVideoForStudent(string studentEmail, string mentorEmail, string subject);
    }
}
