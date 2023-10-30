namespace MANDAT.Common.DTOs
{
    public class CurrentUserWithAddressDto
    {
        public byte[]? UserImage { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Bio { get; set; } = null!;
        public string EducationalInstitution { get; set; } = null!;
        public List<string> Subject { get ; set; }
        public string City { get; set; } = null!;
        public string County { get; set; } = null!;
        public string AddressInfo { get; set; } = null!;
        public double? NumberOfStars { get; set; }
    }
}
