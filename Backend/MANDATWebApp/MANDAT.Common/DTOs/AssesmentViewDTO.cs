using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Common.DTOs
{
    public class AssesmentViewDTO
    {
        public string MentorEmail { get; set; }
        public string StudentEmail { get; set; }
        public DateTime AssessmentDeadline { get; set; }
        public DateTime AssesmentDate { get; set;}
        public bool Check { get; set; }
        public string Text { get; set; } = null!;
        public byte[] MentorPdf { get; set; } // For sending assessments
        public byte[] StudentPdf { get; set; }
        public string Materie { get; set; } 
    }
}
