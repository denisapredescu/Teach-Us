using MANDAT.Common.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MANDAT.BusinessLogic
{
    public class MentorsSubjectDTOComp : IEqualityComparer<MentorsSubjectDTO>
    {
        public bool Equals(MentorsSubjectDTO x, MentorsSubjectDTO y)
        {
            // Compare EmailMentor and Subject
            return x.EmailMentor == y.EmailMentor && x.Subject.SequenceEqual(y.Subject);
        }

        public int GetHashCode(MentorsSubjectDTO obj)
        {
            // Generate a hash code based on EmailMentor and Subject
            unchecked
            {
                int hash = 17;
                hash = hash * 23 + obj.EmailMentor.GetHashCode();
                foreach (var subject in obj.Subject)
                {
                    hash = hash * 23 + subject.GetHashCode();
                }
                return hash;
            }
        }
    }
}
