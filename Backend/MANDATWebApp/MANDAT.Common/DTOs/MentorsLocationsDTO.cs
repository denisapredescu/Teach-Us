using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Common.DTOs
{
    public class MentorsLocationsDTO
    {
        public byte[]? UserImage { get; set; }// = null!;
        public string Username { get; set; }
        public string Email { get; set; }
        public string Bio { get; set; } = null!;
        public string City { get; set; } = null!;
        public string County { get; set; } = null!;
        public string AddressInfo { get; set; } = null!;
    }
}
