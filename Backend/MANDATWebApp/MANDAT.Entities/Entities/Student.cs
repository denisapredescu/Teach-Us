using MANDAT.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Entities.Entities
{
    public partial class Student : IEntity
    {
        [ForeignKey("User")]
        public Guid Id { get; set; }
        public int StudentGrade { get; set; }
        public string StudentSchoolQualification{ get; set; }
        public virtual IdentityUser User { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
        public virtual ICollection<Match> Matches { get; set; }
        public virtual ICollection<VideoMeetingDetails> VideoMeetingsDetails { get; set; }
        public virtual ICollection<Assessment> Assessments { get; set; }
    }
}
