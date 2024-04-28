using MANDAT.Entities.Entities;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;

namespace MANDAT.DataAccess
{
    public class MANDATContext: DbContext
    {
        public MANDATContext(DbContextOptions<MANDATContext> options) : base(options) { }
        
        public DbSet<IdentityUser> IdentityUsers { get; set; }

        public DbSet<IdentityUserToken> IdentityUserTokens { get; set; }

        public DbSet<IdentityRole> IdentityRoles { get; set; }
        public DbSet<Adress> Adresses { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Mentor> Mentors { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Match> Matches { get; set; }
        public DbSet<VideoMeetingDetails> VideoMeetingsDetails { get; set; }
        public DbSet<Video> Videos { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            if (!builder.IsConfigured)
            {
               // builder.UseSqlServer("Data Source=DESKTOP-BOBO71Q\\MSSQLSERVER01;Initial Catalog=MandatProjectDatabase;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");

               builder.UseSqlServer("Data Source=localhost\\SQLEXPRESS;Initial Catalog=MandatProjectDatabase;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
               //builder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=MandatProjectDatabase;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
              // builder.UseSqlServer("Data Source=Boogers;Initial Catalog=MandatProjectDatabase;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
               //builder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=TeachUsProject;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
               //builder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=TeachUsDb;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            }
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //1-1 (IdentityUserToken - IdentityUser)
            builder.Entity<IdentityUserToken>()
                .HasOne(t => t.User)
                .WithOne(u => u.Token);

            //1-M (IdentityRole - IdentityUser)
            builder.Entity<IdentityRole>()
                .HasMany(r => r.Users)
                .WithOne(u => u.Role);

            //1-1 (Adress - IdentityUser)
            builder.Entity<Adress>()
                .HasOne(a => a.User)
                .WithOne(u => u.Adress);

            //1-1 (Student - IdentityUser)
            builder.Entity<Student>()
                .HasOne(s => s.User)
                .WithOne(u => u.Student);

            //1-1 (Mentor - IdentityUser)
            builder.Entity<Mentor>()
                .HasOne(m => m.User)
                .WithOne(u => u.Mentor);

            //1-M (Student - Recenzie)
            builder.Entity<Student>()
                 .HasMany(s => s.Reviews)
                 .WithOne(r => r.Student)
                .OnDelete(DeleteBehavior.Restrict);

            //1-M (Mentor - Recenzie)
            builder.Entity<Mentor>()
                 .HasMany(s => s.Reviews)
                 .WithOne(r => r.Mentor);

            //1-M (Mentor - Recenzie)
            builder.Entity<Mentor>()
                 .HasMany(s => s.Announcements)
                 .WithOne(r => r.Mentor);
            //M-M
            builder.Entity<Match>().HasKey(m => new { m.StudentId, m.MentorId, m.AnnouncementId });
            builder.Entity<Match>()
                .HasOne(m => m.Student)
                .WithMany(s => s.Matches)
                .HasForeignKey(m => m.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Match>()
                .HasOne(m => m.Mentor)
                .WithMany(me => me.Matches)
                .HasForeignKey(m => m.MentorId);

            builder.Entity<VideoMeetingDetails>().HasKey(m => new { m.StudentId, m.MentorId });
            builder.Entity<VideoMeetingDetails>()
                .HasOne(m => m.Student)
                .WithMany(s => s.VideoMeetingsDetails)
                .HasForeignKey(m => m.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<VideoMeetingDetails>()
                .HasOne(m => m.Mentor)
                .WithMany(me => me.VideoMeetingsDetails)
                .HasForeignKey(m => m.MentorId);

            builder.Entity<Assessment>().HasKey(m => new { m.AssessmentId });
            builder.Entity<Assessment>()
                .HasOne(m => m.Student)
                .WithMany(s => s.Assessments)
                .HasForeignKey(m => m.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Assessment>()
                .HasOne(m => m.Mentor)
                .WithMany(me => me.Assessments)
                .HasForeignKey(m => m.MentorId);

            builder.Entity<Video>().HasKey(v => new { v.StudentId, v.MentorId, v.SendDate });
            builder.Entity<Video>()
                .HasOne(v => v.Student)
                .WithMany(s => s.Videos)
                .HasForeignKey(v => v.StudentId)
               .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Video>()
                .HasOne(v => v.Mentor)
                .WithMany(me => me.Videos)
                .HasForeignKey(v => v.MentorId);
        }

    }
}
