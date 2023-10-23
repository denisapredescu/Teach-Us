using MANDAT.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Entities.Entities
{
    public partial class Mentor : IEntity
    {
        [ForeignKey("User")]
        public Guid Id { get; set; }
        public byte[]? MentorIdentityCardFront { get; set; }
        public byte[]? MentorIdentityCardBack { get; set; }

        public virtual IdentityUser User { get; set; }

        public virtual ICollection<Announcement> Announcements { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
        public virtual ICollection<Match> Matches { get; set; }
        public virtual ICollection<VideoMeetingDetails> VideoMeetingsDetails { get; set; }

    }
}
