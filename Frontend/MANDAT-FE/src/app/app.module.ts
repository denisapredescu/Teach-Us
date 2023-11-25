import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login/login.component";
import { FormInputComponent } from "./components/form-input/form-input.component";
import { RegisterComponent } from "./pages/register/register.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { CountrySelectorComponent } from "./components/country-selector/country-selector.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MaterialInputComponent } from "./components/material-input/material-input.component";
import { MaterialEmailComponent } from "./components/material-email/material-email.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDividerModule } from "@angular/material/divider";
import { HttpClientModule } from "@angular/common/http";
import { NgApexchartsModule } from "ng-apexcharts";

import {
  SocialLoginModule,
  SocialAuthService,
  SocialAuthServiceConfig,
  FacebookLoginProvider,
} from "@abacritt/angularx-social-login";
import { AcceptJSService } from "@openutility/acceptjs-angular-wrapper";
import { MentorRequestsComponent } from "./pages/mentor-requests/mentor-requests.component";
import { MyMentorsComponent } from "./pages/my-mentors/my-mentors.component";
import { MyStudentsComponent } from "./pages/my-students/my-students.component";
import { CardComponent } from "./components/card/card.component";
import { MentorRequestCardComponent } from "./components/mentor-request-card/mentor-request-card.component";
import { HomeCardComponent } from "./components/home-card/home-card.component";
import { MatDialogModule } from "@angular/material/dialog";
import { SharedModule } from "./components/shared/shared.module";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { StarRatingComponent } from "./components/star-rating/star-rating.component";
import { CommonModule } from "@angular/common";
import { MentorsComponent } from "./pages/mentors/mentors.component";
import { CreateAnnouncementComponent } from "./pages/create-announcement/create-announcement.component";
import { MyAnnouncementsComponent } from "./pages/my-announcements/my-announcements.component";
import { AccountFormComponent } from './components/account-form/account-form.component';
import { CardsListComponent } from './components/cards-list/cards-list.component';
import { AdminManageUsersComponent } from './pages/admin-manage-users/admin-manage-users.component';
import { VideoMeetingComponent } from "./pages/video-meeting/video-meeting.component";
import { AddParticipantsComponent } from "./pages/video-meeting/add-participants/add-participants.component";
import { MatchingFormComponent } from './pages/matching-form/matching-form.component';
import { VideoPageMentorComponent } from './pages/video-page-mentor/video-page-mentor.component';
import { VideoPageStudentComponent } from './pages/video-page-student/video-page-student.component';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { SettingsComponent } from "./pages/settings/settings.component";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormInputComponent,
    RegisterComponent,
    NotFoundComponent,
    CountrySelectorComponent,
    MaterialInputComponent,
    MaterialEmailComponent,
    HomePageComponent,
    NavbarComponent,
    MentorRequestsComponent,
    MyMentorsComponent,
    MyStudentsComponent,
    MyMentorsComponent,
    CardComponent,
    HomeCardComponent,
    UserProfileComponent,
    MentorRequestCardComponent,
    MentorsComponent,
    CreateAnnouncementComponent,
    MyAnnouncementsComponent,
    AccountFormComponent,
    CardsListComponent,
    AdminManageUsersComponent,
    VideoMeetingComponent,
    AddParticipantsComponent,
    MatchingFormComponent,
    VideoPageMentorComponent,
    VideoPageStudentComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    MatDialogModule,
    NgApexchartsModule,
    NgxYoutubePlayerModule.forRoot()
  ],
  providers: [
    AcceptJSService,
    SocialAuthService,
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider("1540989649735951"),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
