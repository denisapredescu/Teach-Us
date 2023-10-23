using MANDAT.Common.DTOs;
using MANDAT.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.BusinessLogic.Interfaces
{
    public interface IStudentManager
    {
        List<StudentDTO> GetAllStudents();
        StudentDTO? GetStudentById(Guid studentId);
        List<StudentDTO> GetStudentsByName(String name);
        List<StudentDTO> GetStudentsByLocation(Guid locationId);
        List<MentorsForStudentDTO> GetMentorsForStudent(Guid studentId);
        String GetMentorPhoneNumber(Guid studentId, Guid mentorId);
        StudentDTO? Update(Guid studentId, StudentDTO student);
        bool SoftDelete(Guid studentId);


    }
}
