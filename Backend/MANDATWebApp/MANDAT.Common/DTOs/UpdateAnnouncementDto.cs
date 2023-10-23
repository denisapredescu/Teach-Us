using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Common.DTOs
{
    public class UpdateAnnouncementDto
    {
        public string Subject { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public bool MeetingType { get; set; }
    }
}
