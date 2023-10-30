using MANDAT.Common.DTOs;
using MANDAT.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.BusinessLogic.Interfaces
{
    public interface IMentorManager
    {
        List<AllMentorsDto> GetAllMentors();
        List<MentorByIdViewByMentorAdminDTO> GetMentorByIdForMentorAdminView(Guid mentorId);
        List<MentorByIdViewByStudentDTO> GetMentorByIdForStudentView(Guid mentorId);
        List<MentorByIdViewByStudentDTO> GetMentorByName(string username);
        List<MentorByIdViewByStudentDTO> GetMentorsByLocation(Guid locationId);
        List<GetStudentsForMentorDTO> GetStudentsForMentor(Guid mentorId);
        bool Update(Guid id, MentorUpdateDTO mentorUpdateDTO);
        bool ManagerIsDeleted(Guid id, bool isDeleted);
        bool UpdateMentor(Guid id, MentorUpdateItemsDTO mentorUpdate);
        string GetMentorPhoneNumber(Guid studentId, Guid mentorId);
        List<MentorsLocationsDTO> GetMentorsLocations();
    }
}
