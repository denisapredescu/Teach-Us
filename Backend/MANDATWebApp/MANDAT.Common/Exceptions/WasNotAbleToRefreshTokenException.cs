using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Common.Exceptions
{
    public class WasNotAbleToRefreshTokenException : Exception
    {
        public WasNotAbleToRefreshTokenException(string errMessage) : base(errMessage)
        {

        }
    }
}
