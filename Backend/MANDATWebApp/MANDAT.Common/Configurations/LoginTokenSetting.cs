using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Common.Configurations
{
    public class LoginTokenSetting
    {
        public const string NAME = "JWTToken";
        public IDictionary<LoginTokenIdentifier, LoginTokenConfig> LoginTokenConfigs { get; set; }

    }
    public enum LoginTokenIdentifier
    {
        LoginToken,
    }
    public class LoginTokenConfig
    {
        public string Minutes { get; set; }
        public string Hours { get; set; }
        public string Days { get; set; }
    }
}
