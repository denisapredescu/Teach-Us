import { Component } from "@angular/core";
import { HomeCard, HomeCards } from "src/app/constants/home-card";
import { MentorModel } from "src/app/models/mentor-model";
import { MentorService } from "src/app/services/mentor.service";
import { subjects } from "src/app/constants/subjects";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent {
  public cards: HomeCard[] = HomeCards;
  public mentors: MentorModel[] = [];
  public topMentors: MentorModel[] = [];
  public rol: string | null = null;
  public subjects: string[] = subjects;
  public selectedSubject: string = "";
  constructor(
    private mentorsService: MentorService
  ) {}
  ngOnInit(): void {
    this.mentorsService.getAllMentors().subscribe(
      (result: MentorModel[]) => {
        this.mentors = result;
        this.sortByNameASC("");
        this.topMentors = this.mentors.slice(0, 3);
        [this.topMentors[0], this.topMentors[1]] = [
          this.topMentors[1],
          this.topMentors[0],
        ];
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
