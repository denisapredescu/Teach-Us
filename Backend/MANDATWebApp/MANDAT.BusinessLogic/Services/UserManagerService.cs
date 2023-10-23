using Azure.Core;
using MANDAT.BusinessLogic.Base;
using MANDAT.BusinessLogic.Base;
using MANDAT.BusinessLogic.Features.Login;
using MANDAT.BusinessLogic.Interfaces;
using MANDAT.Common.Configurations;
using MANDAT.Common.DTOs;
using MANDAT.Common.Exceptions;
using MANDAT.Common.External.Auth;
using MANDAT.Common.Features.Register;
using MANDAT.Entities.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.BusinessLogic.Services
{
    public class UserManagerService : BaseService, IUserManager
    {
        private readonly IHashAlgo _hashAlgo;
        private readonly ITokenManager _tokenManager;
        private readonly SignInKeySetting _signInKeySetting;
        public UserManagerService(IHashAlgo hashAlgo, ServiceDependencies dependencies,  ITokenManager tokenManager, SignInKeySetting signInKeySetting) :base(dependencies)
        {
            _hashAlgo = hashAlgo;
            _tokenManager = tokenManager;
            _signInKeySetting = signInKeySetting;
        }


        public byte[]? GetUserImage()
        {
            return ExecuteInTransaction(uow =>
            {
                return uow.IdentityUsers.Get()
                             .Where(u => u.Email == CurrentUser.Email)
                             .Select(u => u.UserImage)
                            .SingleOrDefault();
            });
        }
        public byte[] ConvertToBytes(IFormFile image)
        {
            BinaryReader reader = new BinaryReader(image.OpenReadStream());
            var imageBytes = reader.ReadBytes((int)image.Length);
            return imageBytes;
        }

        public List<CurrentUserDto> GetAllUsers()
        {
            return ExecuteInTransaction(uow =>
            {
                return uow.IdentityUsers.Get().Include(w => w.Role).Where(u => u.IsDeleted.Equals(false) && !u.Role.Name.Equals("admin")).Select(u => new CurrentUserDto
                {
                    Email = u.Email,
                    Name = u.Username,
                    UserImage = u.UserImage,
                    Roles = uow.IdentityRoles.Get().Where(w => w.Id.Equals(u.RoleId)).Select(r => r.Name).FirstOrDefault(),
                    Bio = u.Bio
                }).ToList();
            });

        }

        public async Task<IdentityUser> GetUserById(Guid id)
        {
            //var user = await uow.IdentityUsers.Where(u => u.Id.Equals(id)).SingleOrDefaultAsync();
            //return user;
            return null;
        }

        public Task<IdentityUser> GetUserByEmail(string email)
        {
            return ExecuteInTransaction(uow =>
            {
                var user =  uow.IdentityUsers.Get().Where(u => u.IsDeleted.Equals(false) && u.Email.Equals(email)).SingleOrDefaultAsync();
                return user;
            });
            
        }

        public CurrentUserDto? GetUserInfoByEmail(string email)
        {
            return ExecuteInTransaction(uow =>
            {
                var user = uow.IdentityUsers.Get().Where(u => u.IsDeleted.Equals(false) && u.Email.Equals(email)).Select(u => new CurrentUserDto
                {
                    Email = u.Email,
                    Name = u.Username,
                    UserImage = u.UserImage,
                    Roles = uow.IdentityRoles.Get().Where(w => w.Id.Equals(u.RoleId)).Select(r => r.Name).FirstOrDefault()

                }).SingleOrDefault();
                return user;
            });

        }

        public CurrentUserWithAddressDto GetUserInfoWithAddressByEmail(string email)
        {
            return ExecuteInTransaction(uow =>
            {
                return uow.IdentityUsers.Get()
                                            .Include(r => r.Role)
                                            .Where(m => m.IsDeleted == false && m.Email.Equals(email))
                                            .Select(m => new CurrentUserWithAddressDto
                                            {
                                                //  MentorIdentityCardFront = m.MentorIdentityCardFront,
                                                //  MentorIdentityCardBack = m.MentorIdentityCardBack,
                                                //UserImage = m.User.UserImage,
                                                Username = m.Username,
                                                Email = m.Email,
                                                PhoneNumber = m.PhoneNumber,
                                                Bio = m.Bio,
                                                EducationalInstitution = m.EducationalInstitution,
                                                Subject = uow.Announcements.Get().Where(an => an.MentorId == m.Id).Select(s=> s.Subject).ToList(),
                                                City = m.Adress.City,
                                                County = m.Adress.County,
                                                AddressInfo = m.Adress.AddressInfo,
                                            })
                                            .FirstOrDefault();

            });
        }

        public  Guid GetUserByUsername(string username)
        {
            return ExecuteInTransaction(uow =>
            {
                var user =  uow.IdentityUsers.Get().Where(u => u.IsDeleted.Equals(false) && u.Username.Equals(username)).FirstOrDefault();
                return user.Id;
            });
        }

        public Guid GetUserByTheEmail(string email)
        {
            return ExecuteInTransaction(uow =>
            {
                var user = uow.IdentityUsers.Get().Where(u => u.IsDeleted.Equals(false) && u.Email.Equals(email)).FirstOrDefault();
                return user.Id;
            });
        }

        public Guid GetUserIdByEmail(string email)
        {
            return ExecuteInTransaction(uow =>
            {
                var user = uow.IdentityUsers.Get().Where(u => u.IsDeleted.Equals(false) && u.Email.Equals(email)).FirstOrDefault();
                return user.Id;
            });


        }
        public Task<T> GetUserSelectedProperties<T>(string email, Expression<Func<IdentityUser, T>> selector, CancellationToken cancellationToken = default)
        {
            return ExecuteInTransaction(uow =>
            {
                var selectedUserPropertiesObject = uow.IdentityUsers.Get()
              .AsNoTracking()
              .Where(u => u.IsDeleted.Equals(false) && u.Email.Equals(email) )
              .Select(selector)
              .SingleOrDefaultAsync(cancellationToken);

            return selectedUserPropertiesObject;
            });
            
        }

        public async Task<IdentityUserToken> GetUserTokenByRefreshToken(string refreshtoken)
        {
            ///where refreshtokentime is still valid/ where numberofrefreshes < maxallowedtokenrefresh?
            var userTokenObj = await UnitOfWork.IdentityUserTokens.Get().Where(ut => ut.RefreshTokenValue.Equals(refreshtoken)).SingleOrDefaultAsync();
            return userTokenObj;
        }

        public async Task<T> GetUserTokensSelectedProperties<T>(string tokenValue, Expression<Func<IdentityUserTokenConfirmation, T>> selector, CancellationToken cancellationToken = default)
        {
            var selectedUserTokenPropertiesObject = await UnitOfWork.IdentityUserTokenConfirmations.Get().AsNoTracking().Where(utc => utc.ConfirmationToken.Equals(tokenValue)).Select(selector).SingleOrDefaultAsync(cancellationToken);
            return selectedUserTokenPropertiesObject;
        }


        public bool SoftDeleteUser(string email)
        {
            return ExecuteInTransaction(uow =>
            {
                var user = uow.IdentityUsers.Get()
                                                .Where(m => m.Email.Equals(email))
                                                .SingleOrDefault();
                if (user == null)
                {
                    return false;
                }
                user.IsDeleted = true;
                uow.IdentityUsers.Update(user);
                uow.SaveChanges();
                return user.IsDeleted;
            });
        }

        public TokenWrapper Login(LoginCommand loginCommand)
        {
            

            return ExecuteInTransaction(uow => {

                var email = loginCommand.Email;
                IdentityUser user =  uow.IdentityUsers.Get().Where(u => u.Email.Equals(loginCommand.Email) && u.IsDeleted == false).SingleOrDefault();
                user = uow.IdentityUsers.Get().Include(u => u.Role)
                               .SingleOrDefault(u => u.Email.Equals(loginCommand.Email));
                var  roles = user.Role.Name;

                if (user == null)
                {
                    string message = $"User with username or password = {loginCommand.Email}  was not found or your account is deleted";
                    throw new NotFoundException(nameof(IdentityUser), message);
                }


                string initialsalt = user.PasswordHash.Split('.')[1];
                bool isPasswordVerified = _hashAlgo.IsPasswordVerified(user.PasswordHash, initialsalt, loginCommand.Password);
                if (isPasswordVerified)
                {

                    //  var userL = GetUserById(user.Id);

                    //  updateUser(user);

                    var newJti = Guid.NewGuid().ToString();
                    var tokenHandler = new JwtSecurityTokenHandler();
                    //usersecret
                    var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_signInKeySetting.SecretSignInKeyForJwtToken));
                    //int usedRefreshes = -1;
                    var tokenresult = _tokenManager.GenerateTokenAndRefreshToken(signinKey, user, roles, tokenHandler, newJti);
                    //var refreshToken = _tokenManager.GenerateRefreshToken();



                    TokenWrapper tokenwrapper = new TokenWrapper();
                    tokenwrapper.Token = tokenresult.Item1;
                    tokenwrapper.RefreshToken = tokenresult.Item2;


                    return tokenwrapper;
                }
                throw new IncorrectPasswordException("Wrong Password");
            });

            


        }


        public void Register(RegisterCommand registerCommand)
        {
            ExecuteInTransaction(uow =>
            {
                var user =  uow.IdentityUsers.Get().Where(u => u.Email.Equals(registerCommand.Email)).SingleOrDefault();
                if (user != null)
                {
                    string message = "Username=" + registerCommand.Email + " already registered";
                    throw new UserAlreadyRegisteredException(nameof(IdentityUser), message);
                }
                else
                {
                    var registerUser = new IdentityUser();
                    registerUser.Id = Guid.NewGuid();
                    registerUser.Email = registerCommand.Email;
                    registerUser.PhoneNumber = registerCommand.PhoneNumber;
                    registerUser.Username = registerCommand.FirstName + " " + registerCommand.LastName;
                    string result = _hashAlgo.CalculateHashValueWithInput(registerCommand.Password);
                   // registerUser.UserImage = ConvertToBytes(registerCommand.UserImage);
                    registerUser.Bio = registerCommand.Bio;
                    registerUser.EducationalInstitution = registerCommand.EducationalInstitution;
                    registerUser.CreatedAt = DateTime.UtcNow;
                    registerUser.IsActive = true;
                    registerUser.IsDeleted = false;
                    registerUser.RoleId = uow.IdentityRoles.Get().Where(r => r.Name.Equals(registerCommand.Role)).Select(r => r.Id).FirstOrDefault();
                    var location = new Adress();
                    location.Id = Guid.NewGuid();
                    location.UserId = registerUser.Id;
                    location.City = registerCommand.City;
                    location.County = registerCommand.County;
                    location.AddressInfo = registerCommand.AddressInfo;

                    


                    if (result != null)
                    {
                        registerUser.PasswordHash = result;
                        uow.IdentityUsers.Insert(registerUser);


                        //  var id = await uow.IdentityUsers.Where(u => u.Email.Equals(registerCommand.Email)).Select(u => u.Id).SingleOrDefaultAsync();
                        //var roleid = Guid.NewGuid();
                        uow.IdentityUsers.Insert(registerUser);
                        if (registerCommand.Role == "Student")
                        {
                            var student = new Student();
                            student.Id = registerUser.Id;
                            student.StudentGrade = 0;
                            student.StudentSchoolQualification = "";
                            uow.Students.Insert(student);
                        }
                        if (registerCommand.Role == "Mentor")
                        {
                            var mentor = new Mentor();
                            mentor.Id = registerUser.Id;
                            mentor.MentorIdentityCardFront = new byte[] { 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10 }; 

                            mentor.MentorIdentityCardBack = new byte[] { 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10 };
                            uow.Mentors.Insert(mentor);
                        }
                        uow.Adress.Insert(location);
                        //uow.IdentityRoles.Insert(new IdentityUserIdentityRole(registerUser.Id, roleid));
                        uow.SaveChanges();

                    }

                }
            });
            

        }



        public IdentityUser updateUser(IdentityUser user)
        {
            return ExecuteInTransaction(uow =>
            {
                uow.IdentityUsers.Update(user);
                uow.SaveChanges();
                return user;
            });
            

        }

        public bool UpdateUserWithAddressByEmail(string email, CurrentUserWithAddressDto user)
        {
            return ExecuteInTransaction(uow =>
            {
                var updatedUser = uow.IdentityUsers.Get()
                    .Include(a => a.Adress)
                    .Where(u => u.Email.Equals(email))
                    .SingleOrDefault();

                updatedUser.Username = user.Username;
                updatedUser.Email = user.Email;
                updatedUser.PhoneNumber = user.PhoneNumber;
                updatedUser.Bio = user.Bio;
                updatedUser.EducationalInstitution = user.EducationalInstitution;

                updatedUser.Adress.AddressInfo = user.AddressInfo;
                updatedUser.Adress.City = user.City;
                updatedUser.Adress.County = user.County;

                uow.IdentityUsers.Update(updatedUser);
                uow.SaveChanges();
                return true;
            });
        }

    }
}
