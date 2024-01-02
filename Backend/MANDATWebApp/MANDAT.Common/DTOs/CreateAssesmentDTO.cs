using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Common.DTOs
{
    public class CreateAssesmentDTO
    {
        public string MentorEmail { get; set; }
        public string StudentEmail { get; set; }
        public DateTime AssessmentDeadline { get; set; }
        public string Subject { get; set; } = null!;
        public string Text { get; set; } = null!;
        public IFormFile MentorPdf { get; set; } // For sending assessments
       // public byte[] StudentPdf { get; set; }
    }
}
