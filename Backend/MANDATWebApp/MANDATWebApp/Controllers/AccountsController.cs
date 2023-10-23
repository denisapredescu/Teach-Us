using MANDAT.BusinessLogic.Features.Login;
using MANDAT.BusinessLogic.Interfaces;
using MANDAT.BusinessLogic.Services;
using MANDAT.Common.DTOs;
using MANDAT.Common.Exceptions;
using MANDAT.Common.Features.RefreshLoginToken;
using MANDAT.Common.Features.Register;
using MANDAT.Entities.Entities;
using MANDATWebApp.Code.Base;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace MANDATWebApp.Controllers
{
    public class AccountsController : BaseController
    {
        private readonly IUserManager _userAccountService;
        private readonly ITokenManager _tokenManager;
        private readonly IReview _review;
        public AccountsController(ControllerDependencies dependencies,
            IUserManager userAccountService,
            ITokenManager tokenManager,
            IReview review)
            : base(dependencies)
        {
            _userAccountService = userAccountService;
            _tokenManager = tokenManager;
            _review = review;
        }
        [HttpPost("register")]
        public IActionResult Register(RegisterCommand registerCommand)
        {
            try
            {
                _userAccountService.Register(registerCommand);
                return Ok();
            }
            catch (UserAlreadyRegisteredException ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }

        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginCommand loginCommand)
        {

            try
            {
                var result = _userAccountService.Login(loginCommand);
                return Ok(result);

            }
            catch (NotFoundException ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }
            catch (IncorrectPasswordException ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }
            catch (ExceededMaximumAmountOfLoginAttemptsException ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }

        }

        [HttpGet("idUser/{email}")]
        public async Task<IActionResult> GetGuidForUser(string email)
        {
            var id = _userAccountService.GetUserByTheEmail(email);
            return Ok(id);
        }


        [HttpGet("userGuid/{email}")]
        public IActionResult GetUserGuid(string email)
        {
            var result = _userAccountService.GetUserByTheEmail(email);
            return Ok(result);
        }

        [HttpDelete]
        [Route("DeleteTokenAsync/{email}")]
        public async Task<IActionResult> DeleteTokenAsync(string email)
        {
            if (!await _tokenManager.DeleteToken(email))
            {
                return NotFound();
            }
            return Ok();

        }

        [HttpPut("SoftDelete")]
        public IActionResult DeleteUserAccount([FromBody] SoftDeleteUserDTO user)
        {
            var result = _userAccountService.SoftDeleteUser(user.Email);
            return Ok(result);
        }

        [HttpPost]
        [Route("refresh-token")]
        public async Task<IActionResult> RefreshLoginToken([FromBody] RefreshTokenCommand refreshTokenCommand, CancellationToken cancellationToken)
        {
            try
            {
                var result = await _tokenManager.Handle(refreshTokenCommand, cancellationToken);
                return Ok(result);
            }
            catch (IntervalOfRefreshTokenExpiredException ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }
            catch (MaximumRefreshesExceededException ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAllUsers")]
        public IActionResult GetAllUsers()
        {
            var result = _userAccountService.GetAllUsers();
            return Ok(result);
        }

        [HttpGet("GetUserInfoByEmail/{email}")]
        public IActionResult GetUserInfoByEmail(string email)
        {
            var result = _userAccountService.GetUserInfoByEmail(email);
            return Ok(result);
        }

        [HttpGet("GetUserInfoWithAddressByEmail/{email}/{rol}")]
        public IActionResult GetUserInfoWithAddressByEmail(string email, string rol)
        {
    
           var result = _userAccountService.GetUserInfoWithAddressByEmail(email);
            if(rol == "mentor")
            {
                result.NumberOfStars = _review.GetMentorStarsAverageRatingByEmail(email);

            }
            if(rol == "student")
            {
                result.NumberOfStars = _review.GetStudentStarsAverageRatingByEmail(email);

            }

            return Ok(result);
        }

        [HttpPut("UpdateUserWithAddressByEmail/{email}")]
        public IActionResult UpdateUserWithAddress([FromRoute] string email, [FromBody] CurrentUserWithAddressDto user)
        {
            var result = _userAccountService.UpdateUserWithAddressByEmail(email, user);
            return Ok(result);
        }

        //[HttpGet("userGuid/{email}")]
        //public IActionResult GetUserGuid(string email)
        //{
        //    var result = _userAccountService.GetUserByTheEmail(email);
        //    return Ok(result);
        //}

        //[HttpDelete]
        //[Route("DeleteTokenAsync/{email}")]
        //public async Task<IActionResult> DeleteTokenAsync(string email)
        //{
        //    if (!await _tokenManager.DeleteToken(email))
        //    {
        //        return NotFound();
        //    }
        //    return Ok();

        //}


        //[HttpGet("GetUserByEmail/{email}")]
        //public IActionResult GetUserByEmail (string email)
        //{
        //    var result = _userAccountService.GetUserIdByEmail(email);
        //    return Ok(result);
        //}



    }
}

    

