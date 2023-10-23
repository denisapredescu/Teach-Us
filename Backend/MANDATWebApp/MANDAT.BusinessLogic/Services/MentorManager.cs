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
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace MANDAT.BusinessLogic.Services
{
    public class MentorManager : BaseService, IMentorManager
    {
        public MentorManager(ServiceDependencies serviceDependencies, IReview review) : base(serviceDependencies)
        {  
        }

      
        public List<AllMentorsDto> GetAllMentors()
        {
            return ExecuteInTransaction(uow =>
            {
                return uow.Mentors.Get()
                                            .Include(m => m.User)
                                            .ThenInclude(r => r.Role)
                                            .Where(m => m.User.IsDeleted.Equals(false))
                                            .Select(m => new AllMentorsDto
                                            {
                                                //  MentorIdentityCardFront = m.MentorIdentityCardFront,
                                                //  MentorIdentityCardBack = m.MentorIdentityCardBack,
                                                //  UserImage = m.User.UserImage,
                                                Username = m.User.Username,
                                                Email = m.User.Email,
                                                PhoneNumber = m.User.PhoneNumber,
                                                //  PasswordHash = m.User.PasswordHash,
                                                //  CreatedAt = m.User.CreatedAt,
                                                //  IsActive = m.User.IsActive,
                                                //  IsDeleted = m.User.IsDeleted,
                                                Bio = m.User.Bio,
                                                EducationalInstitution = m.User.EducationalInstitution,
                                                RoleName = uow.IdentityRoles.Get().Where(r => r.Id.Equals(m.User.RoleId)).Select(r => r.Name).Single(),
                                                City = m.User.Adress.City,
                                                County = m.User.Adress.County,
                                                AddressInfo = m.User.Adress.AddressInfo,
                                                Subject = uow.Announcements.Get().Where(an => an.MentorId == m.Id).Select(s => s.Subject).ToList(),
                                                Price = uow.Announcements.Get().Where(an => an.MentorId == m.Id).Select(s => s.Price).ToList(),
                                                // Subject = uow.Announcements.Get().FirstOrDefault(an => an.MentorId == m.Id).Subject, changed because a mentor can have more courses
                                            }) 
                                            .ToList();

            });
        }

        public List<MentorByIdViewByMentorAdminDTO> GetMentorByIdForMentorAdminView(Guid mentorId)
        {
            return ExecuteInTransaction(uow =>
            {
                return uow.Mentors.Get()
                                        .Include(m => m.User)
                                        .ThenInclude(r => r.Role)
                                        .Where(m => m.Id.Equals(mentorId) && m.User.IsDeleted.Equals(false))
                                        .Select(m => new MentorByIdViewByMentorAdminDTO
                                        {
                                            // MentorIdentityCardFront = m.MentorIdentityCardFront,
                                            //  MentorIdentityCardBack = m.MentorIdentityCardBack,
                                            // UserImage = m.User.UserImage,
                                            Username = m.User.Username,
                                            Email = m.User.Email,
                                            PhoneNumber = m.User.PhoneNumber,
                                            PasswordHash = m.User.PasswordHash,
                                            CreatedAt = m.User.CreatedAt,
                                            IsActive = m.User.IsActive,
                                            IsDeleted = m.User.IsDeleted,
                                            Bio = m.User.Bio,
                                            EducationalInstitution = m.User.EducationalInstitution,
                                            RoleName = m.User.Role.Name
                                        })
                                        .ToList();
            });
        }


        public List<MentorByIdViewByStudentDTO> GetMentorByIdForStudentView(Guid mentorId)
        {
            return ExecuteInTransaction(uow =>
            {
                return uow.Mentors.Get()
                                        .Include(m => m.User)                     
                                        .Where(m => m.Id.Equals(mentorId) && m.User.IsDeleted.Equals(false))
                                        .Select(m => new MentorByIdViewByStudentDTO
                                        {
                                          //  UserImage = m.User.UserImage,
                                            Username = m.User.Username,
                                            Email = m.User.Email,
                                            Bio = m.User.Bio,
                                            EducationalInstitution = m.User.EducationalInstitution,
                                        })
                                        .ToList();
            });
        }

        public string GetMentorPhoneNumber(Guid studentId, Guid mentorId)
        {
            return ExecuteInTransaction(uow =>
            {
                var phoneNumber = uow.IdentityUsers.Get().Include(m => m.Mentor).Where(m => m.Mentor.Id.Equals(mentorId)).Select(m => m.PhoneNumber).FirstOrDefault();
                var statusMatch =  uow.Matches.Get()
                                            .Include(m => m.Mentor)
                                            .ThenInclude(u => u.User)
                                            .Where(m => m.MentorId.Equals(mentorId) && m.StudentId.Equals(studentId))
                                            .Select(m => m.Status)
                                            .FirstOrDefault();

                if (statusMatch.Equals(true))

                {
                    return phoneNumber;
                }
                else
                    return "";
                

            });
        }
        public List<MentorByIdViewByStudentDTO> GetMentorByName(string username)
        {
            return ExecuteInTransaction(uow =>
            {
                var roleID = uow.IdentityRoles.Get().Where(r => r.Name == "Mentor").Select(r => r.Id).FirstOrDefault();
                var result =  uow.IdentityUsers.Get()
                                        .Where(m => m.Username.Equals(username) && m.RoleId.Equals(roleID) && m.IsDeleted.Equals(false))
                                        .Select(m => new MentorByIdViewByStudentDTO
                                        {
                                            Username = m.Username,
                                            Email = m.Email,
                                            Bio = m.Bio,
                                            EducationalInstitution = m.EducationalInstitution,
                                        })
                                        .ToList();
                return result;
            });
        }

        public List<MentorsLocationsDTO> GetMentorsLocations()
        {
            return ExecuteInTransaction(uow =>
            {
                var result = uow.Mentors.Get()
                                                .Include(m => m.User)
                                                .ThenInclude(u => u.Adress)
                                                .Where(m => m.User.IsDeleted.Equals(false))
                                                .Select(m => new MentorsLocationsDTO
                                                {
                                                    //UserImage = m.User.UserImage,
                                                    Username = m.User.Username,
                                                    Email = m.User.Email,
                                                    Bio = m.User.Bio,
                                                    City = m.User.Adress.City,
                                                    County = m.User.Adress.County,
                                                    AddressInfo = m.User.Adress.AddressInfo,
                                                })
                                                .ToList();
                return result;
            });

        }

        public List<MentorByIdViewByStudentDTO> GetMentorsByLocation(Guid locationId)
        {
            return ExecuteInTransaction(uow =>
            {
                return uow.Mentors.Get()
                                        .Include(m => m.User)
                                        .ThenInclude(u => u.Adress)
                                        .Where(m => m.User.Adress.Id.Equals(locationId) && m.User.IsDeleted.Equals(false))
                                        .Select(m => new MentorByIdViewByStudentDTO
                                        {
                                            // UserImage = m.User.UserImage,
                                            Username = m.User.Username,
                                            Email = m.User.Email,
                                            Bio = m.User.Bio,
                                            EducationalInstitution = m.User.EducationalInstitution
                                        })
                                        .ToList();
            });
        }
        public List<GetStudentsForMentorDTO> GetStudentsForMentor(Guid mentorId)
        {
                return ExecuteInTransaction(db =>
                {
                    var mentors = db.Matches
                                    .Get()
                                    .Include(m => m.Student)
                                    .Include(s => s.Mentor)
                                    .Include(r => r.Mentor.Reviews)
                                    .Where(match => match.MentorId.Equals(mentorId) && match.Status.Equals(StatusMatch.Accepted.ToString()))//.Where(match => match.MentorId.Equals(mentorId) && match.Status.Equals("1"))
                                    .Select(match => new GetStudentsForMentorDTO
                                    {
                                        Username = match.Student.User.Username,
                                        Email = match.Student.User.Email,
                                        PhoneNumber = match.Student.User.PhoneNumber,
                                        //PasswordHash = match.Student.User.PasswordHash,
                                        //CreatedAt = match.Student.User.CreatedAt,
                                        //IsActive = match.Student.User.IsActive,
                                        //IsDeleted = match.Student.User.IsDeleted,
                                        Bio = match.Student.User.Bio,
                                        EducationalInstitution = match.Student.User.EducationalInstitution,
                                        StudentGrade = match.Student.StudentGrade,
                                        StudentSchoolQualification = match.Student.StudentSchoolQualification,
                                        City = match.Student.User.Adress.City,
                                        County = match.Student.User.Adress.County,
                                        AddressInfo = match.Student.User.Adress.AddressInfo,
                                        Subject = match.Mentor.Announcements.FirstOrDefault(m => m.Id == match.AnnouncementId).Subject,
                                        ReviewStatus = "ReviewStudent"
                                    })
                                    .ToList();
                    return mentors;
                });

        }

        public bool Update(Guid id, MentorUpdateDTO mentorUpdateDTO)
        {
            return ExecuteInTransaction(uow =>
            {
                var mentor = uow.Mentors.Get().Include(m => m.User)
                .ThenInclude(a => a.Adress)
                                                .Where(m => m.Id.Equals(id))
                                                .SingleOrDefault();
                mentor.MentorIdentityCardBack = mentorUpdateDTO.MentorIdentityCardBack;
                mentor.MentorIdentityCardFront = mentorUpdateDTO.MentorIdentityCardFront;
                mentor.User.UserImage = mentorUpdateDTO.UserImage;
                mentor.User.Username = mentorUpdateDTO.Username;
                mentor.User.PhoneNumber = mentorUpdateDTO.PhoneNumber;
                mentor.User.PasswordHash = mentorUpdateDTO.PasswordHash;
                mentor.User.CreatedAt = mentorUpdateDTO.CreatedAt;
                mentor.User.IsActive = mentorUpdateDTO.IsActive;
                mentor.User.IsDeleted = mentorUpdateDTO.IsDeleted;
                mentor.User.Bio = mentorUpdateDTO.Bio;
                mentor.User.EducationalInstitution = mentorUpdateDTO.EducationalInstitution;
                mentor.User.RoleId = mentorUpdateDTO.RoleId;

                mentor.User.Adress.UserId = id;
                mentor.User.Adress.AddressInfo = mentorUpdateDTO.AddressInfo;
                mentor.User.Adress.City = mentorUpdateDTO.City;
                mentor.User.Adress.County = mentorUpdateDTO.County;

                uow.Mentors.Update(mentor);
                uow.SaveChanges();
                return true;
            });
        }

        public bool UpdateMentor(Guid id, MentorUpdateItemsDTO mentorUpdate)
        {
            return ExecuteInTransaction(uow =>
            {
                var mentor = uow.Mentors.Get()
                                                .Where(m => m.Id.Equals(id))
                                                .SingleOrDefault();

                mentor.MentorIdentityCardBack = mentorUpdate.MentorIdentityCardBack;
                mentor.MentorIdentityCardFront = mentorUpdate.MentorIdentityCardFront;
               
                uow.Mentors.Update(mentor);
                uow.SaveChanges();
                return true;
            });
        }

        public bool ManagerIsDeleted(Guid id, bool isDeleted)
        {
            return ExecuteInTransaction(uow =>
            {
                var mentor = uow.Mentors.Get().Include(m => m.User)
                                                .Where(m => m.Id.Equals(id))
                                                .SingleOrDefault();
                if (mentor == null)
                {
                    return false;   
                }
                mentor.User.IsDeleted = isDeleted;
                uow.Mentors.Update(mentor);
                uow.SaveChanges();
                return isDeleted;
            });
        }

    }
}
