using MANDAT.BusinessLogic.Base;
using MANDAT.BusinessLogic.Interfaces;
using MANDAT.Common.DTOs;
using MANDAT.Entities.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace MANDAT.BusinessLogic.Services
{
    public class VideoManager : BaseService, IVideoManager
    {
        public VideoManager(ServiceDependencies serviceDependencies) : base(serviceDependencies)
        { }
        public Video NewVideo(CreateVideoDto videoDto)
        {
            return ExecuteInTransaction(uow =>
            {

                var student = uow.Students.Get().FirstOrDefault(s => s.User.Email == videoDto.StudentEmail);
                var mentor = uow.Mentors.Get().FirstOrDefault(s => s.User.Email == videoDto.MentorEmail);
                var video = new Video();

                video.StudentId = student.Id;
                video.MentorId = mentor.Id;
                video.SendDate = DateTime.UtcNow;
                video.VideoUrl = videoDto.VideoUrl;
                video.YoutubeVideoCode = videoDto.YoutubeVideoCode;
                video.Subject = videoDto.Subject;


                uow.Videos.Insert(video);
                uow.SaveChanges();
                return video;
            });
        }

        public List<YoutubeVideoCodeDTO> GetVideoForStudent(string studentEmail, string mentorEmail, string subject)
        {
            return ExecuteInTransaction(uow =>
            {
                var student = uow.Students.Get().FirstOrDefault(s => s.User.Email == studentEmail);
                var mentor = uow.Mentors.Get().FirstOrDefault(s => s.User.Email == mentorEmail);

                var videoYtCode = uow.Videos
                                .Get()
                                .Include(m => m.Mentor)
                                .Include(s => s.Student)
                .Where(video => video.StudentId.Equals(student.Id) && video.MentorId.Equals(mentor.Id) && video.Subject.Equals(subject))
                                .Select(video => new YoutubeVideoCodeDTO
                                {
                                    YoutubeVideoCode = video.YoutubeVideoCode,
                                    SendDate = video.SendDate
                                })
                                
                                .ToList();
                var result = videoYtCode.OrderByDescending(o => o.SendDate).ToList();
                return result;
            });
        }
    }
}
