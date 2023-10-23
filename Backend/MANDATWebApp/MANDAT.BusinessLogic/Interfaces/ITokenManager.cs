using MANDAT.Common.External.Auth;
using MANDAT.Common.Features.RefreshLoginToken;
using MANDAT.Entities.Entities;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.BusinessLogic.Interfaces
{
    public interface ITokenManager
    {
        Tuple<string, string> GenerateTokenAndRefreshToken(SymmetricSecurityKey signinKey, IdentityUser user, string roles, JwtSecurityTokenHandler tokenHandler, string newJti);
        string GenerateRefreshToken();
        SecurityToken GenerateJwtToken(SymmetricSecurityKey signinKey, IdentityUser user, string roles, JwtSecurityTokenHandler tokenHandler, string newJti);
        Tuple<string, string, string, string, string> GetPrincipalFromExpiredToken(string token);
        Tuple<string, string> ReGenerateTokens(ClaimsIdentity claims, IdentityUserToken usertoken);
        bool IsTokenValid(string token);
        Task<IdentityUserToken> GetUserTokenByRefreshToken(string refreshtoken);
        Task<IdentityUser> GetUserById(Guid id);
        Task<TokenWrapper> Handle(RefreshTokenCommand request, CancellationToken cancellationToken);
        //Task MarkRecoveryTokenAsUsed(IdentityUserTokenConfirmation obj);
         Task<bool> DeleteToken(string id);
    }
}
