using MANDAT.Common.DTOs;
using MANDAT.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.BusinessLogic.Interfaces
{
    public interface IMatchingService
    {
        Match NewMatching(Guid mentorId, Guid studentId, string subject);
        List<ViewStudentMatchDTO> InWaitingRequests(Guid studentId);
        List<ViewStudentMatchDTO> AcceptedRequests(Guid studentId);
        List<ViewStudentMatchDTO> RejectedRequests(Guid studentId);
        List<ViewMentorMatchDTO> AllMentorRequests(Guid mentorId);
        List<ViewMentorMatchDTO> MentorInWaitingRequests(string email);
        List<ViewMentorMatchDTO> MentorAcceptedRequests(Guid mentorId);
        List<ViewMentorMatchDTO> MentorRejectedRequests(string email);
        bool RespondToRequests(string mentorEmail, string studentEmail, bool response, string subject);
        bool DeleteRequests(Guid mentorId, Guid studentId, string subject);

    }
}
