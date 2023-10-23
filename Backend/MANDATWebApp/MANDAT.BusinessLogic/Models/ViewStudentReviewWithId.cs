using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.BusinessLogic.Models
{
    public class ViewStudentReviewWithId
    {
        public Guid Id { get; set; }
        public string Message { get; set; } = null!;
        public int StarsNumber { get; set; }
        public string MentorName { get; set; } = null!;
        public byte[]? UserImage { get; set; } = null!;
    }
}
