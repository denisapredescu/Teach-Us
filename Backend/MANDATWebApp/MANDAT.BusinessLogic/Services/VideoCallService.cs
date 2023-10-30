using Azure.Core;
using MANDAT.BusinessLogic.Base;
using MANDAT.BusinessLogic.Interfaces;
using MANDAT.Common.DTOs;
using MANDAT.Entities.Entities;
using MANDAT.Entities.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.BusinessLogic.Services
{
    public class VideoCallService : BaseService, IVideoCallService
    {
        public VideoCallService(ServiceDependencies serviceDependencies) : base(serviceDependencies)
        { }
        public VideoMeetingDetails AddOrUpdateJitsiLink(VideoCallDTO model)
        {
            return ExecuteInTransaction(uow =>
            {
                var info = new VideoMeetingDetails();
                var studentId = uow.IdentityUsers.Get().Where(s => s.Email.Equals(model.StudentEmail)).Select(s => s.Id).FirstOrDefault();
                var mentorId = uow.IdentityUsers.Get().Where(s => s.Email.Equals(model.MentorEmail)).Select(s => s.Id).FirstOrDefault(); ;
                /*var link = uow.VideoMeetingsDetails.Get().Where(v => v.MentorId.Equals(mentorId) && v.StudentId.Equals(studentId));

                if (link != null)
                {
                    info.MentorId = mentorId;
                    info.StudentId = studentId;
                    info.MeetingTime = DateTime.Now;
                    info.Link = model.Link;
                    info.Dial = "no content";
                    uow.VideoMeetingsDetails.Update(info);
                }
                else*/
                //{
                info.MentorId = mentorId;
                info.StudentId = studentId;
                info.MeetingTime = DateTime.Now;
                info.Link = model.Link;
                info.Dial = "no content";
                //info.Dial = model.Dial;
                uow.VideoMeetingsDetails.Insert(info);
                //}
                uow.SaveChanges();
                return info;

            });
        }

        public List<StudentVideoCallInfoDTO> GetStudentVideoCallInfo(string studentEmail)
        {
            return ExecuteInTransaction(uow =>
            {
                var studentId = uow.IdentityUsers.Get().Where(s => s.Email.Equals(studentEmail)).Select(s => s.Id).FirstOrDefault();

                var result = uow.VideoMeetingsDetails.Get()
                                                      .Include(s => s.Mentor)
                                                     .Where(s => s.StudentId.Equals(studentId))
                                                    .Select(s => new StudentVideoCallInfoDTO
                                                    {
                                                        MentorEmail = uow.IdentityUsers.Get().Where(m => m.Id.Equals(s.MentorId)).Select(m => m.Email).FirstOrDefault(),
                                                        MentorName = uow.IdentityUsers.Get().Where(m => m.Id.Equals(s.MentorId)).Select(m => m.Username).FirstOrDefault(),
                                                        Subject = s.Mentor.Announcements.Where(m => m.MentorId.Equals(s.MentorId)).Select(s => s.Subject).First(),
                                                        MeetingTime = s.MeetingTime,
                                                        Link = s.Link,
                                                        Dial = s.Dial
                                                    }).ToList();
                return result;

            });
        }


    }
}
