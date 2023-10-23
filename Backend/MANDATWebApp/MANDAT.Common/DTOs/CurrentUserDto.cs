namespace MANDAT.Common.DTOs
{
    public class CurrentUserDto
    {
   
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public byte[]? UserImage { get; set; }
        public string Roles { get; set; } = null!;
        public string Bio { get; set; } = null!;

    }
}

