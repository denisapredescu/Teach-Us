using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.BusinessLogic.Interfaces
{
    public interface IHashAlgo
    {
        string CalculateHashValueWithInput(string input);
        bool IsPasswordVerified(string input, string usedSalt, string initialHash);
    }
}
