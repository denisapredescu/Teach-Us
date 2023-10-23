using MANDAT.Common.DTOs;
using MANDAT.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace MANDAT.BusinessLogic.Base
{
    public class BaseService
    {
        protected readonly UnitOfWork UnitOfWork;
        protected readonly CurrentUserDto CurrentUser;
        //protected readonly EditUserDto EditUser;

        public BaseService(ServiceDependencies serviceDependencies)
        {
            UnitOfWork = serviceDependencies.UnitOfWork;
            CurrentUser = serviceDependencies.CurrentUser;
        }

        protected TResult ExecuteInTransaction<TResult>(Func<UnitOfWork, TResult> func)
        {
            if (func == null) { throw new ArgumentNullException(nameof(func)); }

            using (var transactionScope = new TransactionScope())
            {
                var result = func(UnitOfWork);

                transactionScope.Complete();

                return result;
            }
        }

        protected void ExecuteInTransaction(Action<UnitOfWork> action)
        {
            if (action == null) { throw new ArgumentNullException(nameof(action)); }

            using (var transactionScope = new TransactionScope())
            {
                action(UnitOfWork);

                transactionScope.Complete();
            }
        }

    }
}
