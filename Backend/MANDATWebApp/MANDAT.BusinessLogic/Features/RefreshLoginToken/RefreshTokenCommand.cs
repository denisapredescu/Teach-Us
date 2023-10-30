using MANDAT.BusinessLogic.Interfaces;
using MANDAT.Common.Exceptions;
using MANDAT.Common.External.Auth;
using MediatR;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Common.Features.RefreshLoginToken
{
    public class RefreshTokenCommand : IRequest<TokenWrapper>
    {
        public string LoginToken { get; set; }
        public string RefreshLoginToken { get; set; }

    
    }
}
