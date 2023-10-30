using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Common.DTOs
{
    public partial class ViewStudentMatchDTO
    {
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime MatchDate { get; set; }
        public string Status { get; set; } = null!;
        public string Subject { get; set; } = null!;
        public int? Price { get; set; }
        //public string MeetingType { get; set; } = null!;

    }
}
