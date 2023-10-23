using MANDAT.Common.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace MANDATWebApp.Code.Base
{
 
        [Route("api/[controller]")]
        [ApiController]
        public class BaseController : Controller
        {
            protected readonly CurrentUserDto CurrentUser;
            //    protected readonly EditUserDto EditUser;
            public BaseController(ControllerDependencies controllerDependencies) : base()
            {
                CurrentUser = controllerDependencies.CurrentUser;
                // EditUser = controllerDependencies.EditUser;
            }
        }
}
