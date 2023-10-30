using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Common.Exceptions
{
    public class NotFoundException : Exception
    {
        public string EntityName { get; }

        public NotFoundException(string entityName, string errMessage) : base(errMessage)
        {
            EntityName = entityName;
        }
    }
    }
