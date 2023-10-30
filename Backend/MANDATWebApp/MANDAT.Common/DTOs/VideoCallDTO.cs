using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Common.DTOs
{
    public class VideoCallDTO
    {
        public string MentorEmail { get; set; }
        public string  StudentEmail { get; set; }
        public string Link { get; set; } = null!;
       // public string Dial { get; set; } = null!;
    }
}
