using MANDAT.Common.DTOs;
using MANDAT.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.BusinessLogic.Base
{
    public class ServiceDependencies
    {
        public UnitOfWork UnitOfWork { get; set; }
        public CurrentUserDto CurrentUser { get; set; }


        public ServiceDependencies(UnitOfWork unitOfWork, CurrentUserDto currentUser)
        {
            UnitOfWork = unitOfWork;
            CurrentUser = currentUser;

        }
    }
}
