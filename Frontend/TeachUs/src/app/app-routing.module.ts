import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { LoginComponent } from "./pages/login/login.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { RegisterComponent } from "./pages/register/register.component";
import { MatchingFormComponent } from "./pages/matching-form/matching-form.component";
import { MentorRequestsComponent } from "./pages/mentor-requests/mentor-requests.component";
import { MyMentorsComponent } from "./pages/my-mentors/my-mentors.component";
import { MyStudentsComponent } from "./pages/my-students/my-students.component";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { VideoMeetingComponent } from "./pages/video-meeting/video-meeting.component";
import { MentorsComponent } from "./pages/mentors/mentors.component";
import { CreateAnnouncementComponent } from "./pages/create-announcement/create-announcement.component";
import { MyAnnouncementsComponent } from "./pages/my-announcements/my-announcements.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { AdminManageUsersComponent } from "./pages/admin-manage-users/admin-manage-users.component";

const routes: Routes = [
  { path: "home", component: HomePageComponent },
  { path: "user-profile/:email", component: UserProfileComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "settings/:email", component: SettingsComponent },
  { path: "settings", component: SettingsComponent },
  { path: "admin-manage-users", component: AdminManageUsersComponent },
  { path: "create-announcement", component: CreateAnnouncementComponent },
  { path: "match", component: MatchingFormComponent },
  { path: "my-students", component: MyStudentsComponent },
  { path: "my-mentors", component: MyMentorsComponent },
  { path: "my-announcements", component: MyAnnouncementsComponent },
  { path: "video-meeting", component: VideoMeetingComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "requests", component: MentorRequestsComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "mentors", component: MentorsComponent },
  { path: "#popup-article", component: MyStudentsComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
