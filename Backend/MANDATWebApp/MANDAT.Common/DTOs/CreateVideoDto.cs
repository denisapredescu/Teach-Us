using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Common.DTOs
{
    public class CreateVideoDto
    {
        public string MentorEmail { get; set; }
        public string StudentEmail { get; set; }
        public string VideoUrl { get; set; }
        public string YoutubeVideoCode { get; set; }
        public string Subject { get; set; } = null!;
    }
}
