using MANDAT.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Entities.Entities
{
    public partial class Assessment : IEntity
    {
        public Guid AssessmentId { get; set; }
        public Guid MentorId { get; set; }
        public Guid StudentId { get; set; }
        public DateTime AssessmentCreationDate { get; set; }
        public DateTime AssessmentDeadline { get; set; }

        public string Text { get; set; } = null!;
        public byte[] MentorPdf { get; set; } // For sending assessments
        public byte[] StudentPdf { get; set; }

        public Boolean checkStatus {get; set;}
        public string Subject { get; set; } = null!;

        public virtual Student Student { get; set; }
        public virtual Mentor Mentor { get; set; }
    }
}
