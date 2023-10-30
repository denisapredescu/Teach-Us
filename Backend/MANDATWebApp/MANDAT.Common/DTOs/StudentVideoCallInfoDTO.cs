using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Common.DTOs
{
    public class StudentVideoCallInfoDTO
    {
        public string MentorEmail { get; set; } = null!;
        public string MentorName { get; set; } = null!;
        public string Subject { get; set;} = null!;
        public DateTime MeetingTime { get; set; }
        public string Link { get; set; } = null!;
        public string Dial { get; set; } = null!;
    }
}
