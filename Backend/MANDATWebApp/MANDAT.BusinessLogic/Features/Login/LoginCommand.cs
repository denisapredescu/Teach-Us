using MANDAT.BusinessLogic.Interfaces;
using MANDAT.Common.Configurations;
using MANDAT.Common.Exceptions;
using MANDAT.Common.External.Auth;
using MANDAT.Entities.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.BusinessLogic.Features.Login
{
    public class LoginCommand : IRequest<TokenWrapper>
    {
       // public string UniqueIdentifier { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
       // public Guid Id { get; set; }
    }

  //internal class LoginCommandHandler : IRequestHandler<LoginCommand, TokenWrapper>
  //  {
  //      private readonly IUserManager _userManager;
  //      private readonly IHashAlgo _hashAlgo;
  //      private readonly ITokenManager _tokenManager;
  //      private readonly LoginTokenConfig _loginTokenConfig;

  //      public LoginCommandHandler(IUserManager userManager, IHashAlgo hashAlgo, ITokenManager tokenManager, LoginTokenConfig loginTokenConfig)
  //      {
  //          _userManager = userManager;
  //          _hashAlgo = hashAlgo;
  //          _tokenManager = tokenManager;
  //          _loginTokenConfig = loginTokenConfig;
  //      }

  //      public async Task<TokenWrapper> Handle(LoginCommand request, CancellationToken cancellationToken)
  //      {
  //          //mut in appsettings
  //          const int maxLoginAttempts = 5;


  //      var userProps = await _userManager.GetUserSelectedProperties(
  //          request.Email,
  //          user => new { user.Id,  user.PasswordHash, user.Email });


  //          if (userProps == null)
  //          {
  //              string message = $"User with username or password = {request.Email}  was not found";
  //              throw new NotFoundException(nameof(IdentityUser), message);
  //          }


  //          string initialsalt = userProps.PasswordHash.Split('.')[1];
  //          bool isPasswordVerified = _hashAlgo.IsPasswordVerified(userProps.PasswordHash, initialsalt, request.Password);


  //          var user = await _userManager.GetUserById(userProps.Id);


            
  //               _userManager.updateUser(user);
  //             // throw new IncorrectPasswordException("Wrong Password");
  //        //  }
  

  //               _userManager.updateUser(user);
  //              var result = _userManager.Login(request);
  //              return  result;

  //          }

        
  //  }
}
