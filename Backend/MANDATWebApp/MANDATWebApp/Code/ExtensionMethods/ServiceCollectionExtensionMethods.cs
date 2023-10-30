using MANDAT.BusinessLogic.Base;
using MANDAT.BusinessLogic.Interfaces;
using MANDAT.BusinessLogic.Services;
using MANDAT.Common.Configurations;
using MANDAT.Common.DTOs;
using MANDAT.Common.Features.PasswordHashing;
using MANDAT.DataAccess;
using MANDATWebApp.Code.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;

namespace MANDATWebApp.Code.ExtensionMethods
{
    public static class ServiceCollectionExtensionMethods
    {

        public static IServiceCollection AddPresentation(this IServiceCollection services)
        {
            services.AddScoped<ControllerDependencies>();
            return services;
        }

        public static IServiceCollection AddMANDATAppBusinessLogic(this IServiceCollection services, IConfiguration configuration)
        {
            //services.AddDbContexts(configuration);
            services.AddScoped<ServiceDependencies>();
            services.AddSignInKeyConfiguration(configuration);
            services.AddRefreshTokenConfiguration(configuration);
            services.AddLoginTokenConfiguration(configuration);
            services.AddScoped<IUserManager, UserManagerService>();
            services.AddScoped<IHashAlgo, HashAlgo>();
            services.AddScoped<ITokenManager, TokenManager>();
            services.AddScoped<IReview, ReviewService>();
            services.AddScoped<IMentorManager, MentorManager>();
            services.AddScoped<IAnnouncementManager, AnnouncementManager>();
            services.AddScoped<IMatchingService, MatchingService>();
            services.AddScoped<IStudentManager, StudentService>();
            services.AddScoped<IVideoCallService, VideoCallService>();

            // services.AddScoped<aici adaugam serviciu>();...

            return services;
        }
        private static IServiceCollection AddSignInKeyConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            var signinConfig = configuration.GetSection(SignInKeySetting.NAME).Get<SignInKeySetting>();
            //Console.WriteLine(signinConfig.SecretSignInKeyForJwtToken);
            services.AddSingleton(signinConfig);
            return services;

        }

        private static IServiceCollection AddLoginTokenConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            var logintokenConfig = configuration.GetSection(LoginTokenSetting.NAME).Get<LoginTokenSetting>();
            if (logintokenConfig.LoginTokenConfigs.TryGetValue(LoginTokenIdentifier.LoginToken, out var loginTokenConfig) == false)
            {

                throw new Exception();
            }
            // Console.WriteLine(loginTokenConfig.Minutes);
            services.AddSingleton(loginTokenConfig);
            return services;

        }
        private static IServiceCollection AddRefreshTokenConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            var reftokenConfig = configuration.GetSection(RefreshTokenSetting.NAME).Get<RefreshTokenSetting>();
            if (reftokenConfig.RefreshTokenConfigs.TryGetValue(RefreshTokenIdentifier.RefreshToken, out var refreshTokenConfig) == false)
            {

                throw new Exception();
            }
            //Console.WriteLine(refreshTokenConfig.Issuer);
            services.AddSingleton(refreshTokenConfig);
            return services;
        }


        public static IServiceCollection AddMANDATAppCurrentUser(this IServiceCollection services)
        {
            services.AddScoped(s =>
            {
                var accessor = s.GetService<IHttpContextAccessor>();
                var httpContext = accessor.HttpContext;
                var claims = httpContext.User.Claims;


                var userIdClaim = claims?.SingleOrDefault(c => c.Type == "Id")?.Value;
                var isParsingSuccessful = Guid.TryParse(userIdClaim, out Guid id);
                var userEmail = claims?.SingleOrDefault(e => e.Type == ClaimTypes.Email)?.Value;
                var userName = claims?.SingleOrDefault(e => e.Type == ClaimTypes.Name)?.Value;

                var uow = s.GetService<UnitOfWork>()!;
                //var userImage = uow.IdentityUsers
                //    .Get()
                //    .SingleOrDefault(ui => ui.Email == userEmail)?.UserImage; pentru imagine de profil
                return new CurrentUserDto
                {
                    Email = userEmail,
                    Name = userName,

                   // UserImage = userImage


                };
            });

            return services;
        }

        //private static IServiceCollection AddDbContexts(this IServiceCollection services, IConfiguration configuration)
        //{
        //    var connectionOptions = configuration.GetSection(ConnectionStringSetting.NAME).Get<ConnectionStringSetting>();


        //    if (connectionOptions.ConnectionStringConfigs.TryGetValue(DatabaseIdentifier.MANDATProjectDatabase, out var MANDATDbConfig) == false)
        //    {

        //        throw new ArgumentException($"{nameof(DatabaseIdentifier.MANDATProjectDatabase)} was not found in the dbConfig!");
        //    }
        //    Console.WriteLine(MANDATDbConfig.ConnectionString);
        //    services.AddDbContext<MANDATContext>(options =>
        //    {
        //        options.UseSqlServer(MANDATDbConfig.ConnectionString, configOption =>
        //        {
        //            configOption.CommandTimeout(MANDATDbConfig.TimeoutSeconds);
        //        });
        //    });

        //    return services;
        //}
    }
}
