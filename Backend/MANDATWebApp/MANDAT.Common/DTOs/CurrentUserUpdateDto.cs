using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Common.DTOs
{
    public class CurrentUserUpdateDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Bio { get; set; } = null!;
        public string EducationalInstitution { get; set; } = null!;
        public string City { get; set; } = null!;
        public string County { get; set; } = null!;
        public string AddressInfo { get; set; } = null!;
       
    }
}
