using MANDAT.Common.DTOs;

namespace MANDATWebApp.Code.Base
{
    public class ControllerDependencies
    {
        public CurrentUserDto CurrentUser { get; set; }
        //   public EditUserDto EditUser { get; set; }


        public ControllerDependencies(CurrentUserDto currentUser)
        {
            CurrentUser = currentUser;
            //  EditUser = editUser;
        }
    }
}
