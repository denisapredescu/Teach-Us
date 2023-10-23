using MANDAT.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Entities.Entities
{
    public partial class Review : IEntity
    {
        public Guid Id { get; set; }
        public string Message { get; set; }
        public int StarsNumber { get; set; }

        [ForeignKey("Mentor")]
        public Guid MentorId { get; set; }

        [ForeignKey("Student")]
        public Guid StudentId { get; set; }

        public string ReviewStatus { get; set; } = null!;

        public virtual Mentor Mentor { get; set; }
        public virtual Student Student { get; set; }
    }
}
