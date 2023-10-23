using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Common.DTOs
{
    public partial class ViewMentorMatchDTO
    {
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime MatchDate { get; set; }
        public string Status { get; set; } = null!;
        public string subject { get; set; } = null!;


    }
}
