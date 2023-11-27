using MANDAT.Common;

namespace MANDAT.Entities.Entities
{
    public partial class Video: IEntity
    {
        public Guid MentorId { get; set; }
        public Guid StudentId { get; set; }
        public DateTime SendDate { get; set; }
        public string VideoUrl { get; set; }
        public string YoutubeVideoCode { get; set; }
        public string Subject { get; set; }

        public virtual Student Student { get; set; }
        public virtual Mentor Mentor { get; set; }

    }
}
