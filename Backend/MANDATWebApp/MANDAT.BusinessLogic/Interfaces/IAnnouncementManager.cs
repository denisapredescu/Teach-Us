using MANDAT.Common.DTOs;
using MANDAT.Entities.Entities;

namespace MANDAT.BusinessLogic.Interfaces
{
    public interface IAnnouncementManager
    {

        List<AllAnnouncementsDto> GetAllAnnouncements();
        List<AllAnnouncementsDto> GetAllAnnouncementByMentorId(Guid mentorId);
        List<AllAnnouncementsDto> GetAllAnnouncementByEmail(string email);
        List<AllAnnouncementsDto> GetAllAnnouncementBySubject(string subject);
        List<AllAnnouncementsDto> GetAllAnnouncementByPrice(int price);
        List<AllAnnouncementsDto> GetAllAnnouncementByType(bool MeetingType);
        Announcement Create(CreateAnnouncementDto createAnnouncementDto);
        Announcement CreateWithEmail(CreateAnnouncementWithEmailDto createAnnouncementWithEmailDto);
        bool Update(Guid id, UpdateAnnouncementDto updateAnnouncementDto);
        bool DeleteAnnouncement(Guid id);
    }
}
