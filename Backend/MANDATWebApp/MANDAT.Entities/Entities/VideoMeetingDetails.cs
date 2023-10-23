using MANDAT.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Entities.Entities
{
    public partial class VideoMeetingDetails : IEntity
    {
        public Guid MentorId { get; set; }
        public Guid StudentId { get; set; }
        public DateTime MeetingTime { get; set; }
        public string Link { get; set; } = null!;
        public string Dial { get; set; } = null!;
        public virtual Student Student { get; set; }
        public virtual Mentor Mentor { get; set; }
    }
}
