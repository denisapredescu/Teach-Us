using MANDAT.BusinessLogic.Features.Login;
using MANDAT.Common.DTOs;
using MANDAT.Common.External.Auth;
using MANDAT.Common.Features.Register;
using MANDAT.Entities.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.BusinessLogic.Interfaces
{
    public interface IUserManager
    {
        byte[]? GetUserImage();
        byte[] ConvertToBytes(IFormFile image);
        Task<T> GetUserSelectedProperties<T>(string uniqueIdentifier, Expression<Func<IdentityUser, T>> selector, CancellationToken cancellationToken = default);
        Task<T> GetUserTokensSelectedProperties<T>(string tokenValue, Expression<Func<IdentityUserTokenConfirmation, T>> selector, CancellationToken cancellationToken = default);
        List<CurrentUserDto> GetAllUsers();
        Task<IdentityUser> GetUserById(Guid id);
        Task<IdentityUser> GetUserByEmail(string email);
        Guid GetUserByUsername(string username);

        TokenWrapper Login(LoginCommand loginCommand);
        void Register(RegisterCommand registerCommand);
        Task<IdentityUserToken> GetUserTokenByRefreshToken(string refreshtoken);
        IdentityUser updateUser(IdentityUser user);
        bool UpdateUserWithAddressByEmail(string email, CurrentUserWithAddressDto user);
        CurrentUserDto GetUserInfoByEmail(string email);
        CurrentUserWithAddressDto GetUserInfoWithAddressByEmail(string email);
        Guid GetUserIdByEmail(string email);
        // Task<bool> saveAsync();
        bool SoftDeleteUser(string email);
        Guid GetUserByTheEmail(string email);
    }
}
