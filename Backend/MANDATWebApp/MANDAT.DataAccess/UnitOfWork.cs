using MANDAT.Common;
using MANDAT.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.DataAccess
{
    public class UnitOfWork
    {
        private readonly MANDATContext Context;

        public UnitOfWork(MANDATContext context)
        {
            this.Context = context;
        }
        private IRepository<IdentityUser> identityUsers;
        public IRepository<IdentityUser> IdentityUsers => identityUsers ?? (identityUsers = new BaseRepository<IdentityUser>(Context));

        private IRepository<IdentityRole> identityRoles;
        public IRepository<IdentityRole> IdentityRoles => identityRoles ?? (identityRoles = new BaseRepository<IdentityRole>(Context));

        private IRepository<Adress> adresses;
        public IRepository<Adress> Adress => adresses ?? (adresses = new BaseRepository<Adress>(Context));

        private IRepository<Announcement> announcements;
        public IRepository<Announcement> Announcements => announcements ?? (announcements = new BaseRepository<Announcement>(Context));
        
        private IRepository<IdentityUserToken> identityUserTokens;
        public IRepository<IdentityUserToken> IdentityUserTokens => identityUserTokens ?? (identityUserTokens = new BaseRepository<IdentityUserToken>(Context));

        private IRepository<IdentityUserTokenConfirmation> identityUserTokenConfirmation;
        public IRepository<IdentityUserTokenConfirmation> IdentityUserTokenConfirmations => identityUserTokenConfirmation ?? (identityUserTokenConfirmation = new BaseRepository<IdentityUserTokenConfirmation>(Context));

        private IRepository<Mentor> mentors;
        public IRepository<Mentor> Mentors => mentors ?? (mentors = new BaseRepository<Mentor>(Context));

        private IRepository<Review> reviews;
        public IRepository<Review> Reviews => reviews ?? (reviews = new BaseRepository<Review>(Context));

        private IRepository<Student> students;
        public IRepository<Student> Students => students ?? (students = new BaseRepository<Student>(Context));

        private IRepository<Match> matches;
        public IRepository<Match> Matches => matches ?? (matches = new BaseRepository<Match>(Context));

        private IRepository<VideoMeetingDetails> videoDetails;
        public IRepository<VideoMeetingDetails> VideoMeetingsDetails => videoDetails ?? (videoDetails = new BaseRepository<VideoMeetingDetails>(Context));
        private IRepository<Assessment> assessments;
        public IRepository<Assessment> Assessments => assessments ?? (assessments = new BaseRepository<Assessment>(Context));
        public void SaveChanges()
        {
            Context.SaveChanges();
        }
    }
}
