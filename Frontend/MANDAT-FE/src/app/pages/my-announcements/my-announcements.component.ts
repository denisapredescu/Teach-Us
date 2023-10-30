import { Component } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { MeetingTypes } from "src/app/constants/meeting-types";
import { AnnouncementModel } from "src/app/models/announcement-model";
import { ListCardModel } from "src/app/models/cards-list-model";
import { AnnouncementService } from "src/app/services/announcement.service";

@Component({
  selector: "app-my-announcements",
  templateUrl: "./my-announcements.component.html",
  styleUrls: ["./my-announcements.component.scss"],
})
export class MyAnnouncementsComponent {
  private email: string;
  meetingTypes: Map<boolean, string> = MeetingTypes;
  announcements: AnnouncementModel[];
  cardsListModel: ListCardModel[] = [];

  constructor(
    private announcementService: AnnouncementService,
    private cookieService: CookieService
  ) {
    this.email = cookieService.get("Email");
    this.announcementService
      .GetAllAnnouncmentWithEmail(this.email)
      .subscribe(result => {
        this.announcements = result;
        this.announcements.forEach(announcement => {
          const model: ListCardModel = {
            id: announcement.id,
            leftTitle: announcement.subject,
            mainTitle: announcement.price + " Lei",
            typeSubtitle: {
              key: this.meetingTypes.get(announcement.meetingType) || "",
              value: announcement.meetingType,
            },
            description: announcement.description,
          };
          this.cardsListModel.push(model);
        });
        console.log(this.cardsListModel);
      });
  }
}