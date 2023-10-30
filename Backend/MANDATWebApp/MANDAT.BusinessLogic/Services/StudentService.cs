using MANDAT.BusinessLogic.Base;
using MANDAT.BusinessLogic.Interfaces;
using MANDAT.Common.DTOs;
using MANDAT.Entities.Entities;
using MANDAT.Entities.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.BusinessLogic.Services
{
    public class StudentService : BaseService, IStudentManager
    {
        public StudentService(ServiceDependencies serviceDependencies) : base(serviceDependencies)
        {  }

        public List<StudentDTO> GetAllStudents()
        {
            return ExecuteInTransaction(db =>
            {
                 var students = db.Students
                                  .Get()
                                  .Include(u => u.User)
                                  .ThenInclude(l => l.Adress)
                                  .Where(student => student.User.IsDeleted.Equals(false))
                                  .Select(student => new StudentDTO
                                  {
                                     Username = student.User.Username,
                                     Email = student.User.Email,
                                     PhoneNumber = student.User.PhoneNumber,
                                     PasswordHash = student.User.PasswordHash,
                                     CreatedAt = student.User.CreatedAt,
                                     IsActive = student.User.IsActive,
                                     Bio = student.User.Bio,
                                     EducationalInstitution = student.User.EducationalInstitution,
                                     StudentGrade = student.StudentGrade,
                                     StudentSchoolQualification = student.StudentSchoolQualification,
                                     City = student.User.Adress.City,
                                     County = student.User.Adress.County,
                                     AddressInfo = student.User.Adress.AddressInfo
                                  }).ToList();
                return students;
            });
        }

        public StudentDTO? GetStudentById(Guid studentId)   // one student
        {
            return ExecuteInTransaction(db =>
            {
                var student = db.Students
                                 .Get()
                                 .Include(u => u.User)
                                 .ThenInclude(l => l.Adress)
                                 .Where(student => student.User.IsDeleted.Equals(false) && student.Id.Equals(studentId))
                                 .Select(student => new StudentDTO
                                 {
                                     Username = student.User.Username,
                                     Email = student.User.Email,
                                     PhoneNumber = student.User.PhoneNumber,
                                     PasswordHash = student.User.PasswordHash,
                                     CreatedAt = student.User.CreatedAt,
                                     IsActive = student.User.IsActive,
                                     Bio = student.User.Bio,
                                     EducationalInstitution = student.User.EducationalInstitution,
                                     StudentGrade = student.StudentGrade,
                                     StudentSchoolQualification = student.StudentSchoolQualification,
                                     City = student.User.Adress.City,
                                     County = student.User.Adress.County,
                                     AddressInfo = student.User.Adress.AddressInfo
                                 }).FirstOrDefault();
                return student;
            });
        }


        public List<StudentDTO> GetStudentsByName(string name)
        {
            return ExecuteInTransaction(db =>
            {
                var students = db.Students
                                 .Get()
                                 .Include(u => u.User)
                                 .ThenInclude(l => l.Adress)
                                 .Where(student => student.User.IsDeleted.Equals(false) && student.User.Username.Equals(name))
                                 .Select(student => new StudentDTO
                                 {
                                     Username = student.User.Username,
                                     Email = student.User.Email,
                                     PhoneNumber = student.User.PhoneNumber,
                                     PasswordHash = student.User.PasswordHash,
                                     CreatedAt = student.User.CreatedAt,
                                     IsActive = student.User.IsActive,
                                     Bio = student.User.Bio,
                                     EducationalInstitution = student.User.EducationalInstitution,
                                     StudentGrade = student.StudentGrade,
                                     StudentSchoolQualification = student.StudentSchoolQualification,
                                     City = student.User.Adress.City,
                                     County = student.User.Adress.County,
                                     AddressInfo = student.User.Adress.AddressInfo
                                 }).ToList();
                return students;
            });

        }


        public List<StudentDTO> GetStudentsByLocation(Guid locationId)
        {
            return ExecuteInTransaction(db =>
            {
                var students = db.Students
                                 .Get()
                                 .Include(u => u.User)
                                 .ThenInclude(l => l.Adress)
                                 .Where(student => student.User.IsDeleted.Equals(false) && student.User.Adress.Id.Equals(locationId))
                                 .Select(student => new StudentDTO
                                 {
                                     Username = student.User.Username,
                                     Email = student.User.Email,
                                     PhoneNumber = student.User.PhoneNumber,
                                     PasswordHash = student.User.PasswordHash,
                                     CreatedAt = student.User.CreatedAt,
                                     IsActive = student.User.IsActive,
                                     Bio = student.User.Bio,
                                     EducationalInstitution = student.User.EducationalInstitution,
                                     StudentGrade = student.StudentGrade,
                                     StudentSchoolQualification = student.StudentSchoolQualification,
                                     City = student.User.Adress.City,
                                     County = student.User.Adress.County,
                                     AddressInfo = student.User.Adress.AddressInfo
                                 }).ToList();
                return students;
            });
        }

        public List<MentorsForStudentDTO> GetMentorsForStudent(Guid studentId)//buna pana intr-un punct
        {
          
            return ExecuteInTransaction(db =>
            {
                var mentors = db.Matches
                                .Get()
                                .Include(m => m.Mentor)
                                .Include(a => a.Mentor.Announcements)
                                .Include(s => s.Student)
                                .Include(r => r.Student.Reviews)
                                .Where(match => match.StudentId.Equals(studentId) && match.Status.Equals(StatusMatch.Accepted.ToString()))//.Where(match => match.StudentId.Equals(studentId) && match.Status.Equals("1"))//
                                .Select(match => new MentorsForStudentDTO
                                {
                                    Username = match.Mentor.User.Username,
                                    Email = match.Mentor.User.Email,
                                    PhoneNumber = match.Mentor.User.PhoneNumber,
                                    PasswordHash = match.Mentor.User.PasswordHash,
                                    CreatedAt = match.Mentor.User.CreatedAt,
                                    IsActive = match.Mentor.User.IsActive,
                                    IsDeleted = match.Mentor.User.IsDeleted,
                                    Bio = match.Mentor.User.Bio,
                                    EducationalInstitution = match.Mentor.User.EducationalInstitution,
                                    City = match.Mentor.User.Adress.City,
                                    County = match.Mentor.User.Adress.County,
                                    AddressInfo = match.Mentor.User.Adress.AddressInfo,
                                    Subject = match.Mentor.Announcements.FirstOrDefault(m => m.Id == match.AnnouncementId).Subject,                                  
                                    ReviewStatus = "ReviewMentor"
                                })
                                .ToList();
                return mentors;
            });
        }

        public String GetMentorPhoneNumber(Guid studentId, Guid mentorId)
        {
            return ExecuteInTransaction(db =>
            {
            var phoneNumber = db.Matches
                             .Get()
                             .Include(m => m.Mentor)
                             .Where(match => match.StudentId.Equals(studentId) && match.MentorId.Equals(mentorId) && match.Status.Equals(StatusMatch.Accepted.ToString()))//("1")
                             .Select(match => match.Mentor.User.PhoneNumber).FirstOrDefault();

                if (phoneNumber == null)
                    return "";

                return phoneNumber;
            });
        }

        public StudentDTO? Update(Guid studentId, StudentDTO student)
        {
            return ExecuteInTransaction(db =>
            {
                var updateStudent = db.Students
                                       .Get()
                                       .Include(u => u.User)
                                       .ThenInclude(l => l.Adress)
                                       .Where(st => st.Id.Equals(studentId))
                                       .FirstOrDefault();

                updateStudent.User.Username = student.Username;
                updateStudent.User.Email = student.Email;
                updateStudent.User.PhoneNumber = student.PhoneNumber;
                updateStudent.User.PasswordHash = student.PasswordHash;
                updateStudent.User.CreatedAt = student.CreatedAt;
                updateStudent.User.IsActive = student.IsActive;
                updateStudent.User.Bio = student.Bio;
                updateStudent.User.EducationalInstitution = student.EducationalInstitution;
                updateStudent.StudentGrade = student.StudentGrade;
                updateStudent.StudentSchoolQualification = student.StudentSchoolQualification;
                updateStudent.User.Adress.City = student.City;
                updateStudent.User.Adress.County = student.County;
                updateStudent.User.Adress.AddressInfo = student.AddressInfo;


                db.Students.Update((Student)updateStudent);
                db.SaveChanges();

                var updatedStudent = GetStudentById(studentId);

                return updatedStudent;
               
            });
        }

        public bool SoftDelete(Guid studentId)
        {
            return ExecuteInTransaction(db =>
            {
                var selectedStudent = db.Students
                                        .Get()
                                        .Include(u => u.User)
                                        .Where(st => st.Id.Equals(studentId))
                                        .FirstOrDefault();

                if (selectedStudent == null)
                    return false;   
               
                selectedStudent.User.IsDeleted = true;
                db.Students.Update(selectedStudent);
                db.SaveChanges();
                return true;
            });
        }
    }
}
