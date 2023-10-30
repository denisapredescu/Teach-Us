using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Common.Configurations
{
    public class RefreshTokenSetting
    {
        public const string NAME = "JWTToken";
        public IDictionary<RefreshTokenIdentifier, RefreshTokenConfig> RefreshTokenConfigs { get; set; }

    }
    public enum RefreshTokenIdentifier
    {
        RefreshToken,
    }
    public class RefreshTokenConfig
    {
        public string NumberOfRefreshes { get; set; }
        public string TimeLeftUntilRefreshTokenExpiresAfterTokenAlreadyExpired { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
    }
}
