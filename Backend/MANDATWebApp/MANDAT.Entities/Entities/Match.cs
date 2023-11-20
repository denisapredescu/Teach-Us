using MANDAT.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Entities.Entities
{
    public partial class Match : IEntity
    {
        public Guid MentorId { get; set; }
        public Guid StudentId { get; set; }

        public Guid AnnouncementId { get; set; }
        public DateTime MatchDate { get; set; }
        public string Status { get; set; }

        public virtual Student Student { get; set; }
        public virtual Mentor Mentor { get; set;}
        public virtual Announcement Announcement { get; set; }

    }
}
