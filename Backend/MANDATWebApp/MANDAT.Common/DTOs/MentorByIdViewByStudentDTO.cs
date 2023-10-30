using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Common.DTOs
{
    public class MentorByIdViewByStudentDTO
    {
        public byte[]? UserImage { get; set; }// = null!;
        public string Username { get; set; }
        public string Email { get; set; }
        public string Bio { get; set; } = null!;
        public string EducationalInstitution { get; set; } = null!;
    }
}
