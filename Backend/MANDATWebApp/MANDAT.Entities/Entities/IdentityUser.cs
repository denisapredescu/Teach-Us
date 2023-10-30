using MANDAT.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Entities.Entities
{
    public partial class IdentityUser : IEntity
    {
        public IdentityUser()
        {

            //IdentityRoles = new HashSet<IdentityRole>();
            // IdentityUserTokenConfirmations = new HashSet<IdentityUserTokenConfirmation>();
            // IdentityUserTokens = new HashSet<IdentityUserToken>();
        }

        public Guid Id { get; set; }
        public byte[]? UserImage { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string PasswordHash { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        public string Bio { get; set; } = null!;
        public string EducationalInstitution { get; set; } = null!;

        [ForeignKey("Role")]
        public Guid RoleId { get; set; }
        public virtual IdentityUserToken Token { get; set; }
        public virtual IdentityRole Role { get; set; }
        public virtual Mentor Mentor { get; set; }
        public virtual Student Student { get; set; }
        public virtual Adress Adress { get; set; }

    }
    //public virtual ICollection<IdentityRole> IdentityRoles { get; set; }
    // public virtual ICollection<IdentityUserTokenConfirmation> IdentityUserTokenConfirmations { get; set; }
    // public virtual ICollection<IdentityUserToken> IdentityUserTokens { get; set; }
    // public virtual ICollection<IdentityUserIdentityRole> IdentityUserRoles { get; set; }

}

