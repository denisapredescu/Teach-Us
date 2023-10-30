using MANDAT.Common;

namespace MANDAT.Entities.Entities
{
    public partial class Announcement : IEntity
    {
        public Guid Id { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public bool MeetingType { get; set; }  // true = online, false = f2f

        public Guid MentorId { get; set; }
        public virtual Mentor Mentor { get; set; }
    }
}
