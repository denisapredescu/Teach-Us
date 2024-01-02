import { Component } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { MentorModel } from "src/app/models/mentor-model";
import { MentorService } from "src/app/services/mentor.service";
import { ReviewService } from "src/app/services/review.service";

@Component({
  selector: "app-mentors",
  templateUrl: "./mentors.component.html",
  styleUrls: ["./mentors.component.scss"],
})
export class MentorsComponent {
  public emailSt?: string;
  public mentors: MentorModel[] = [];
  public filteredList: MentorModel[] = [];
  public sortByStarsAsc: boolean = true;
  public sortByNameAsc: boolean = true;
  public matchStatus: boolean = false;

  matchCity: string = "";
  matchCounty: string = "";
  matchSubject: string = "";
  matchMeeting: string = "";
  matchStars: number = 0;

  constructor(
    private reviewService: ReviewService,
    private cookie: CookieService,
    private mentorsService: MentorService
  ) {}

  ngOnInit(): void {

    this.mentorsService.getAllMentors().subscribe(
      (result:MentorModel[]) => {
        this.mentors = result;
        console.log(this.mentors);

        if(this.cookie.get("matchCity")!="" ||
         this.cookie.get("matchCounty")!="" ||
         this.cookie.get("matchSubject")!="" ||
         this.cookie.get("matchMeeting")!="" ||
         this.cookie.get("matchStars")!="0")
            {this.filterMentors();

    this.cookie.delete("matchCity");
    this.cookie.delete("matchCounty");
    this.cookie.delete("matchSubject");
    this.cookie.delete("matchMeeting");
    this.cookie.delete("matchStars");
            }
        this.filteredList=this.mentors;
        this.sortByNameASC();
        this.sortByNameAsc = true;
      },
      (error)=>{
        console.error(error);
      }
    );


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
    //     subject: ["mate"],
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
    //     subject: ["mate"],
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

    //console.log(this.mentors);
    //this.filterMentors();
    //this.sortByNameASC();
   // this.sortByNameAsc = true;
    // this.mentorsService.getAllMentors().subscribe(
    //   (result: MentorModel[]) => {
    //     this.mentors = result;

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

  filterMentors() {
    console.log(this.cookie.check("matchCity"));

    if (this.cookie.check("matchCity"))
      this.matchCity = this.cookie.get("matchCity");
    else this.matchCity = "";

    if (this.cookie.check("matchCounty"))
      this.matchCounty = this.cookie.get("matchCounty");
    else this.matchCounty = "";

    if (this.cookie.check("matchSubject")) {
      this.matchSubject = this.cookie.get("matchSubject");
      this.matchStatus = true;
    } else this.matchSubject = "";

    if (this.cookie.check("matchStars"))
      this.matchStars = parseInt(this.cookie.get("matchStars"));
    else this.matchStars = 0;

    this.filteredList = this.mentors.filter(mentor => {
      if (this.matchCity === "") return mentor;
      else return mentor.city == this.matchCity;
    });

    this.filteredList = this.filteredList.filter(mentor => {
      if (this.matchCounty === "") return mentor;
      else return mentor.county == this.matchCounty;
    });

    this.filteredList = this.filteredList.filter(mentor => {
      if (this.matchSubject === "") {
        return mentor;
      } else {
        if (mentor.subject.length > 1) {
          for (let sub of mentor.subject) {
            if (sub == this.matchSubject) return mentor;
            else continue;
          }
        } else return mentor.subject[0] == this.matchSubject;
      }
      return false;
    });

    this.filteredList = this.filteredList.filter(mentor => {
      console.log(mentor.numberOfStars);
      if (this.matchStars === 0) return mentor;
      else return mentor.numberOfStars == this.matchStars;
    });

    this.mentors = this.filteredList;

    console.log(this.mentors);
    // this.cookie.set("matchCity", "");
    // this.cookie.set("matchCounty", "");
    // this.cookie.set("matchSubject", "");
    // this.cookie.set("matchMeeting", "");
    // this.cookie.set("matchStars", "0");
    // this.cookie.delete("matchCity");
    // this.cookie.delete("matchCounty");
    // this.cookie.delete("matchSubject");
    // this.cookie.delete("matchMeeting");
    // this.cookie.delete("matchStars");
  }

  public sortByNameASC() {
    this.sortByNameAsc = true;
    this.mentors.sort((a, b) => {
      return a.username.localeCompare(b.username);
    });
  }

  public sortByNameDESC() {
    this.sortByNameAsc = false;
    this.mentors.sort((a, b) => {
      return b.username.localeCompare(a.username);
    });
  }

  public sortedStarsAscending() {
    this.sortByStarsAsc = true;
    this.mentors.sort((a, b) => {
      return (
        (a.numberOfStars !== undefined ? a.numberOfStars : 0) -
        (b.numberOfStars !== undefined ? b.numberOfStars : 0)
      );
    });
  }

  public sortedStarsDescending() {
    this.sortByStarsAsc = false;
    this.mentors.sort((a, b) => {
      return (
        (b.numberOfStars !== undefined ? b.numberOfStars : 0) -
        (a.numberOfStars !== undefined ? a.numberOfStars : 0)
      );
    });
  }
}
