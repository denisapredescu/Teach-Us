using MANDAT.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Entities.Entities
{
    public partial class IdentityRole : IEntity
    {
        public IdentityRole() { }

        public Guid Id { get; set; }
        public string Name { get; set; } = null!;

        public virtual ICollection<IdentityUser>Users { get; set; }


    }
}
