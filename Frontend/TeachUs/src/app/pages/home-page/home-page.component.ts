import { Component } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { HomeCard, HomeCards } from "src/app/constants/home-card";
import { MentorModel } from "src/app/models/mentor-model";
import { MentorService } from "src/app/services/mentor.service";
import { ReviewService } from "src/app/services/review.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent {
  public cards: HomeCard[] = HomeCards;
  public topMentors: MentorModel[] = [];
  public matchStatus: boolean = false;

  constructor(
    private reviewService: ReviewService,
    private cookie: CookieService,
    private mentorsService: MentorService
  ) {}

  ngOnInit(): void {
    this.topMentors = [
      {
        username: "ana",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: new Date(),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["mate"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 2,
        price: [50],
      },
      {
        username: "daniel",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: new Date(),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["mate"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 5,
        price: [50],
      },
      {
        username: "mircea",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: new Date(),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["mate"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 1,
        price: [50],
      },
      {
        username: "ileana",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: new Date(),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["mate"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        price: [50],
      },
      {
        username: "cristi",
        email: "email",
        phoneNumber: "0728282106",
        passwordHash: "csdcsdcsc",
        createdAt: new Date(),
        isActive: true,
        isDeleted: false,
        bio: "bio",
        educationalInstitution: "fmi",
        subject: ["mate"],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 5,
        price: [50],
      },
    ];

    console.log(this.topMentors);
    this.sortByNameASC();
    console.log(this.topMentors);
    this.topMentors = this.topMentors.slice(0, 3);
    [this.topMentors[0], this.topMentors[1]] = [
      this.topMentors[1],
      this.topMentors[0],
    ];
    console.log(this.topMentors);

    // this.mentorsService.getAllMentors().subscribe(
    //   (result: MentorModel[]) => {
    //     // this.mentors = result;

    //     // for(let mentor of this.mentors) {

    //     //   this.reviewService.getMentorsStars(mentor.email).subscribe(
    //     //     (result:number) => {
    //     //       mentor.numberOfStars = result;
    //     //     },
    //     //     (error) => {
    //     //       console.error(error);
    //     //     });
    //     // } // the stars now come from server; I added this change because when I added a console log in star filter method the numberOfStars were undefined

    //     console.log(this.mentors);
    //     this.filterMentors();
    //     this.sortByNameASC();
    //     this.sortByNameAsc = true;
    //   },
    //   error => {
    //     console.error(error);
    //   }
    // );
  }

  public sortByNameASC() {
    this.topMentors = this.topMentors.sort((a, b) => {
      const starsA = a.numberOfStars || 0;
      const starsB = b.numberOfStars || 0;

      return starsA < starsB ? 1 : starsA > starsB ? -1 : 0;
    });
  }
}
