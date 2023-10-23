using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Common.DTOs
{
    public class CreateAnnouncementWithEmailDto
    {
        public string Email { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public bool MeetingType { get; set; }  // true = online, false = f2f
    }
}
