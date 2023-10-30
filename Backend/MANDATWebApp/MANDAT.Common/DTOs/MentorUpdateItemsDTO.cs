using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.Common.DTOs
{
    public class MentorUpdateItemsDTO
    {
        public byte[]? MentorIdentityCardFront { get; set; }// = null!;
        public byte[]? MentorIdentityCardBack { get; set; }// = null!;
    }
}
