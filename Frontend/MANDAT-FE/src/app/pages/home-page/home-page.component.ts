import { Component } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { HomeCard, HomeCards } from "src/app/constants/home-card";
import { MentorModel } from "src/app/models/mentor-model";
import { MentorService } from "src/app/services/mentor.service";
import { ReviewService } from "src/app/services/review.service";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent {
  public cards: HomeCard[] = HomeCards;
  public mentors: MentorModel[] = [];
  public topMentors: MentorModel[] = [];
  public matchStatus: boolean = false;
  public rol: string | null = null;
  public subjects: string[] = ["mate", "romana", "info"];
  selectedSubject: string = "";

  constructor(
    private reviewService: ReviewService,
    private cookie: CookieService,
    private mentorsService: MentorService
  ) {}

  ngOnInit(): void {
    // this.mentors = [
    //   {
    //     username: "ana",
    //     email: "email",
    //     phoneNumber: "0728282106",
    //     passwordHash: "csdcsdcsc",
    //     createdAt: new Date(),
    //     isActive: true,
    //     isDeleted: false,
    //     bio: "bio",
    //     educationalInstitution: "fmi",
    //     subject: ["mate"],
    //     reviewStatus: "nimic",
    //     city: "buc",
    //     county: "ro",
    //     addressInfo: "dr taberei",
    //     numberOfStars: 2,
    //     price: [50],
    //   },
    //   {
    //     username: "daniel",
    //     email: "email",
    //     phoneNumber: "0728282106",
    //     passwordHash: "csdcsdcsc",
    //     createdAt: new Date(),
    //     isActive: true,
    //     isDeleted: false,
    //     bio: "bio",
    //     educationalInstitution: "fmi",
    //     subject: ["mate"],
    //     reviewStatus: "nimic",
    //     city: "buc",
    //     county: "ro",
    //     addressInfo: "dr taberei",
    //     numberOfStars: 5,
    //     price: [50],
    //   },
    //   {
    //     username: "mircea",
    //     email: "email",
    //     phoneNumber: "0728282106",
    //     passwordHash: "csdcsdcsc",
    //     createdAt: new Date(),
    //     isActive: true,
    //     isDeleted: false,
    //     bio: "bio",
    //     educationalInstitution: "fmi",
    //     subject: ["romana"],
    //     reviewStatus: "nimic",
    //     city: "buc",
    //     county: "ro",
    //     addressInfo: "dr taberei",
    //     numberOfStars: 1,
    //     price: [50],
    //   },
    //   {
    //     username: "ileana",
    //     email: "email",
    //     phoneNumber: "0728282106",
    //     passwordHash: "csdcsdcsc",
    //     createdAt: new Date(),
    //     isActive: true,
    //     isDeleted: false,
    //     bio: "bio",
    //     educationalInstitution: "fmi",
    //     subject: ["info"],
    //     reviewStatus: "nimic",
    //     city: "buc",
    //     county: "ro",
    //     addressInfo: "dr taberei",
    //     price: [50],
    //   },
    //   {
    //     username: "cristi",
    //     email: "email",
    //     phoneNumber: "0728282106",
    //     passwordHash: "csdcsdcsc",
    //     createdAt: new Date(),
    //     isActive: true,
    //     isDeleted: false,
    //     bio: "bio",
    //     educationalInstitution: "fmi",
    //     subject: ["mate"],
    //     reviewStatus: "nimic",
    //     city: "buc",
    //     county: "ro",
    //     addressInfo: "dr taberei",
    //     numberOfStars: 5,
    //     price: [50],
    //   },
    // ];

    // console.log(this.topMentors);
    // this.sortByNameASC("");
    // console.log(this.topMentors);
    // this.topMentors = this.topMentors.slice(0, 3);
    // [this.topMentors[0], this.topMentors[1]] = [
    //   this.topMentors[1],
    //   this.topMentors[0],
    // ];
    // console.log(this.topMentors);

    // this.rol = localStorage.getItem("Rol");
    // console.log(this.rol);

    this.mentorsService.getAllMentors().subscribe(
      (result: MentorModel[]) => {
        this.topMentors = result;

        console.log(this.topMentors);
        this.sortByNameASC("");
        console.log(this.topMentors);
        this.topMentors = this.topMentors.slice(0, 3);
        [this.topMentors[0], this.topMentors[1]] = [
          this.topMentors[1],
          this.topMentors[0],
        ];
        console.log(this.topMentors);
      },
      error => {
        console.error(error);
      }
    );
  }

  public sortByNameASC(subject: string) {
    this.topMentors = this.mentors.sort((a, b) => {
      const starsA = a.numberOfStars || 0;
      const starsB = b.numberOfStars || 0;

      return starsA < starsB ? 1 : starsA > starsB ? -1 : 0;
    });

    if (subject !== "") {
      this.topMentors = this.topMentors.filter(mentor =>
        mentor.subject.includes(subject)
      );
    }
  }

  onSubjectChange() {
    console.log("Selected option:", this.selectedSubject);
    this.sortByNameASC(this.selectedSubject);
    while (this.topMentors.length < 3) {
      this.topMentors.push({
        username: "",
        email: "email",
        phoneNumber: "",
        passwordHash: "",
        createdAt: new Date(),
        isActive: true,
        isDeleted: false,
        bio: "",
        educationalInstitution: "fmi",
        subject: [],
        reviewStatus: "nimic",
        city: "buc",
        county: "ro",
        addressInfo: "dr taberei",
        numberOfStars: 0,
        price: [50],
      }); // Add an empty object to fill the remaining slots
    }
    this.topMentors = this.topMentors.slice(0, 3);
    [this.topMentors[0], this.topMentors[1]] = [
      this.topMentors[1],
      this.topMentors[0],
    ];
  }
}
