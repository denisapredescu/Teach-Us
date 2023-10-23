using MANDAT.BusinessLogic.Base;
using MANDAT.BusinessLogic.Interfaces;
using MANDAT.Common.Configurations;
using MANDAT.Common.Exceptions;
using MANDAT.Common.External.Auth;
using MANDAT.Common.Features.RefreshLoginToken;
using MANDAT.Entities.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
namespace MANDAT.BusinessLogic.Services
{
    public class TokenManager : BaseService, ITokenManager
    {
        private readonly RefreshTokenConfig _refreshTokenConfig;
        private readonly SignInKeySetting _signInKeySetting;
        private readonly LoginTokenConfig _loginTokenConfig;
        public TokenManager( RefreshTokenConfig refreshTokenConfig, 
                             SignInKeySetting signInKeySetting,
                             LoginTokenConfig loginTokenConfig,
                             ServiceDependencies dependencies) :base(dependencies)
        {
            _refreshTokenConfig = refreshTokenConfig;
            _signInKeySetting = signInKeySetting;
            _loginTokenConfig = loginTokenConfig;
        }



        public  Tuple<string, string> GenerateTokenAndRefreshToken(SymmetricSecurityKey signinKey, IdentityUser user, string roles, JwtSecurityTokenHandler tokenHandler, string newJti)
        {

            var token = GenerateJwtToken(signinKey, user, roles, tokenHandler, newJti);
            string tokenStringValue = tokenHandler.WriteToken(token);
            var refreshToken = GenerateRefreshToken();

            
            UnitOfWork.IdentityUserTokens.Insert(new IdentityUserToken()
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                TokenValue = tokenStringValue,
                RefreshTokenValue = refreshToken,
                CreationDate = token.ValidFrom,
                ExpirationDate = token.ValidTo
            });

             UnitOfWork.SaveChanges();
            var tuple = new Tuple<string, string>(tokenStringValue, refreshToken);
            return tuple;

        }

        public SecurityToken GenerateJwtToken(SymmetricSecurityKey signinKey, IdentityUser user, string roles, JwtSecurityTokenHandler tokenHandler, string newJti)
        {


            var subject = new ClaimsIdentity(new Claim[] {
                     new Claim(ClaimTypes.Email,user.Email),
                     new Claim(ClaimTypes.Name,user.Username),
                     new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                     new Claim(JwtRegisteredClaimNames.Jti,newJti),
                     new Claim("NumberOfAllowedRefreshes",_refreshTokenConfig.NumberOfRefreshes),
                     new Claim("IntervalOfUseOfRefreshTokenAfterTokenHasExpired",_refreshTokenConfig.TimeLeftUntilRefreshTokenExpiresAfterTokenAlreadyExpired),
                     new Claim(ClaimTypes.Role, roles)

             });
   
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = subject,
                Issuer = _refreshTokenConfig.Issuer,
                Audience = _refreshTokenConfig.Audience,
                // Expires = DateTime.UtcNow.AddDays(Int32.Parse(_loginTokenConfig.Days)),
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256),
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return token;
        }


        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        public Tuple<string, string, string, string, string> GetPrincipalFromExpiredToken(string token)
        {


            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(token);
            var decodedToken = jsonToken as JwtSecurityToken;

            var jti = decodedToken.Claims.First(claim => claim.Type.Equals("jti")).ToString().Split(':')[1];
            var roles = decodedToken.Claims.First(claim => claim.Type.Equals("role")).ToString().Split(':')[1];  //?
            var allowedRefreshes = decodedToken.Claims.First(claim => claim.Type.Equals("NumberOfAllowedRefreshes")).ToString().Split(':')[1]; //
            var intervalOfUse = decodedToken.Claims.First(claim => claim.Type.Equals("IntervalOfUseOfRefreshTokenAfterTokenHasExpired")).ToString().Split(':')[1]; //
            var expirationDate = decodedToken.Claims.First(claim => claim.Type.Equals("exp")).ToString().Split(':')[1]; //

            var tuple = new Tuple<string, string, string, string, string>(allowedRefreshes, intervalOfUse, expirationDate, jti, roles);
            return tuple;

        }

        public Tuple<string, string> ReGenerateTokens(ClaimsIdentity claims, IdentityUserToken usertoken)
        {
            var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_signInKeySetting.SecretSignInKeyForJwtToken));
            var refreshToken = GenerateRefreshToken();

            var tokenDescriptor = new  SecurityTokenDescriptor
            {
                Subject = claims,
                Issuer = _refreshTokenConfig.Issuer,
                Audience = _refreshTokenConfig.Audience,
                // Expires = DateTime.UtcNow.AddMinutes(Int32.Parse(_loginTokenConfig.Minutes)), 
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256)

            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            string tokenStringValue = tokenHandler.WriteToken(token);
            usertoken.TokenValue = tokenStringValue;
            usertoken.RefreshTokenValue = refreshToken;
            usertoken.CreationDate = token.ValidFrom;
            usertoken.ExpirationDate = token.ValidTo;
            //await _context.SaveChangesAsync(); 
            var tuple = new Tuple<string, string>(tokenStringValue, refreshToken);
            return tuple;
        }

        public bool IsTokenValid(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = true, // folosit sa valized audience si issuer setate in app.json
                ValidateIssuer = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_signInKeySetting.SecretSignInKeyForJwtToken)),
                ValidateLifetime = true,
                ValidIssuer = _refreshTokenConfig.Issuer,
                ValidAudience = _refreshTokenConfig.Audience
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken validatedToken;
            IPrincipal principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out validatedToken);
            return true;
        }

        public async Task<IdentityUserToken> GetUserTokenByRefreshToken(string refreshtoken)
        {
            ///where refreshtokentime is still valid/ where numberofrefreshes < maxallowedtokenrefresh?
            var userTokenObj = await UnitOfWork.IdentityUserTokens.Get().Where(ut => ut.RefreshTokenValue.Equals(refreshtoken)).SingleOrDefaultAsync();
            return userTokenObj;
        }
        public async Task<IdentityUser> GetUserById(Guid id)
        {
            var user = await UnitOfWork.IdentityUsers.Get().Where(u => u.Id.Equals(id)).SingleOrDefaultAsync();
            return user;
        }

        public async Task<TokenWrapper> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
        {
            var IdentityUserTokenObj = await GetUserTokenByRefreshToken(request.RefreshLoginToken);
            var user = await GetUserById(IdentityUserTokenObj.UserId);
            var result = GetPrincipalFromExpiredToken(request.LoginToken);


            var allowedRefreshes = Int32.Parse(result.Item1);
            var intervalOfUse = Int32.Parse(result.Item2);
            //1
            var expirationDate = Int32.Parse(result.Item3);
            DateTime tokenExpiration = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc); //.local
            tokenExpiration = tokenExpiration.AddSeconds(expirationDate).ToLocalTime();
            var jti = result.Item4;
            var roles = result.Item5.Split(',');


            //timespan


            if (IdentityUserTokenObj == null)
            {
                throw new WasNotAbleToRefreshTokenException("");
            }


            TokenWrapper tokenwrapper = new TokenWrapper();
            bool isTokenVerified = IsTokenValid(request.LoginToken);
            if (isTokenVerified == true)
            {
                if (tokenExpiration < DateTime.UtcNow.AddHours(3))
                {
                    if (tokenExpiration.AddMinutes(intervalOfUse) >= DateTime.UtcNow)//addhours +2
                    {
                        if (allowedRefreshes != 0)
                        {
                            allowedRefreshes = allowedRefreshes - 1;
                            var claims = new ClaimsIdentity(new Claim[] {
                            new Claim(ClaimTypes.Email,user.Email),
                            new Claim(ClaimTypes.Name,user.Username),
                            new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                            new Claim(JwtRegisteredClaimNames.Jti,jti),
                            new Claim("NumberOfAllowedRefreshes",allowedRefreshes.ToString()),
                            new Claim("IntervalOfUseOfRefreshTokenAfterTokenHasExpired",intervalOfUse.ToString())


                        });
                            foreach (var role in roles)
                            {
                                claims.AddClaim(new Claim(ClaimTypes.Role, role));
                            }
                            var tuple =  ReGenerateTokens(claims, IdentityUserTokenObj);

                            tokenwrapper.Token = tuple.Item1;
                            tokenwrapper.RefreshToken = tuple.Item2;
                            return tokenwrapper;

                        }
                        else
                        {
                            throw new MaximumRefreshesExceededException("You can't refresh the current token anymore. Please login again");
                        }



                        //se poate folosi refreshtoken ul si se face update in tabela IdentityUserToken cu un nou token si reftoken
                        //urmand sa se decrementeze NumberOfRefreshes pana cand =0

                    }
                    else
                    {
                        throw new IntervalOfRefreshTokenExpiredException("Please login again!");
                    }
                }
            }

            return tokenwrapper;


        }

        public async Task<bool> DeleteToken(string email)
        {


            return ExecuteInTransaction(uow =>
            {
                var id = uow.IdentityUsers.Get().Where(cd => cd.Email.Equals(email)).Select(cd => cd.Id).Single();

                var comment = uow.IdentityUserTokens.Get()
                                                .Where(cd => cd.UserId.Equals(id))
                                                .Single();
                if (comment == null)
                {
                    return false;
                }
                uow.IdentityUserTokens.Delete(comment);
                uow.SaveChanges();
                return true;

            });
        }
    }
}
