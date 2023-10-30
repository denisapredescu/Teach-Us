using MANDAT.BusinessLogic.Interfaces;
using MANDAT.Common.Exceptions;
using MANDAT.Entities.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Common.Features.Register
{
    public class RegisterCommand : IRequest<bool>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
      //  public  IFormFile  UserImage { get; set; } = null!;

        public string Role { get; set; } = null!;
        public string Bio { get; set; } = null!;

        public string EducationalInstitution { get; set; } = null!;
        public string City { get; set; } = null!;
        public string County { get; set; } = null!;
        public string AddressInfo { get; set; } = null!;



    }
    internal class RegisterCommandHandler : IRequestHandler<RegisterCommand, bool>
    {
        private readonly IUserManager _userManager;
        private readonly ITokenManager _tokenManager;
        public RegisterCommandHandler(IUserManager userManager,  ITokenManager tokenManager)
        {
            _userManager = userManager;
            _tokenManager = tokenManager;
        }
        public async Task<bool> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            bool ok = false;
            var userProps = await _userManager.GetUserSelectedProperties(request.Email, user => new { user.Id, user.Email });
            if (userProps != null)
            {

                string message = $"Username={request.Email} already registered";
                throw new UserAlreadyRegisteredException(nameof(IdentityUser), message);
            }
            else
            {
                 _userManager.Register(request);
                ok = true;

            }
            return ok;
        }
    }
}
