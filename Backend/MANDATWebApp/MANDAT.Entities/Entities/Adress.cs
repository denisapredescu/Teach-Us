using MANDAT.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Entities.Entities
{
    public partial class Adress : IEntity
    {
        public Guid Id { get; set; }
        public string City { get; set; } = null!;
        public string County { get; set; } = null!;
        public string AddressInfo { get; set; } = null!;

        [ForeignKey("User")]
        public Guid UserId { get; set; }
        public virtual IdentityUser User { get; set; }
    }
}
