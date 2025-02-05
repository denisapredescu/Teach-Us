import { Component, OnInit, ViewChild } from "@angular/core";
import { UserAccountService } from "src/app/services/user-account.service";
import { UserAccountWithAddress } from "src/app/models/user-account-with-address-model";
import { MentorRequestsService } from "src/app/services/mentor-requests.service";
import { Roles } from "src/app/constants/roles";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { ReviewViewStudent } from "src/app/models/review-view-student";
import { ReviewService } from "src/app/services/review.service";
import { ReviewViewMentor } from "src/app/models/review-view-mentor";

export type ChartOptions = {
  series:  ApexNonAxisChartSeries; 
  chart?: ApexChart | '';
  responsive: ApexResponsive[];
  labels: any;
};

declare var google: any;
const apiKey = "AIzaSyDoXRvHuYgJDyVIhkYxJN8zhPa_6tRbces";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  public userAccountWithAddress: UserAccountWithAddress = {
    username: "",
    email: "",
    phoneNumber: "",
    bio: "",
    educationalInstitution: "",
    subject: [],
    city: "",
    county: "",
    addressInfo: "",
    numberOfStars: 0
  };

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  notifications: number;
  email: string | null;
  parameterEmail: string | null;
  rating: number;
  rol: string | null;
  roles: Roles = new Roles();
  isPersonalProfile: boolean = false;
  requests: any = [];
  justViewProfile: string | null = 'false';
  public reviews: ReviewViewStudent[] = [];
  public reviewsMentor: ReviewViewMentor[]=[];
  public reviewsLoggedStudent: ReviewViewStudent[]=[];  
  public reviewsLoggedMentor: ReviewViewMentor[]=[];
  


  // requestsMock: any = [
  //   {
  //     "fullName": "a",
  //     "email": "b",
  //     "matchDate": "c",
  //     "status": "accepted",
  //     "subject": "e"
  //   },
  //   {
  //     "fullName": "a",
  //     "email": "b",
  //     "matchDate": "c",
  //     "status": "rejected",
  //     "subject": "e"
  //   },
  //   {
  //     "fullName": "a",
  //     "email": "b",
  //     "matchDate": "c",
  //     "status": "rejected",
  //     "subject": "e"
  //   },
  //   {
  //     "fullName": "a",
  //     "email": "b",
  //     "matchDate": "c",
  //     "status": "waiting",
  //     "subject": "e"
  //   },
  //   {
  //     "fullName": "a",
  //     "email": "b",
  //     "matchDate": "c",
  //     "status": "waiting",
  //     "subject": "e"
  //   },
  //   {
  //     "fullName": "a",
  //     "email": "b",
  //     "matchDate": "c",
  //     "status": "waiting",
  //     "subject": "e"
  //   },

  // ];

  constructor(
    private userAccountService: UserAccountService,
    private mentorRequestService: MentorRequestsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.email = params.get("email") || "";
      this.parameterEmail = this.email;
    });
    
    this.checkAndSetProfileDetails();
    this.getUserInfo();
    this.getUserRequests();
    this.getAllUserRequestsAndCreateChart();
    this.getReviewsReceiveByStudent();
  }
  getReviewsReceiveByStudent(){

  }
  checkAndSetProfileDetails() {
    if (this.email === "") {
      this.isPersonalProfile = true;
      this.email = localStorage.getItem("Email") !== null ? localStorage.getItem("Email") : sessionStorage.getItem("Email");
    }

    this.email = this.email !== null ? this.email : '';
    let rememberMe = localStorage.getItem("rememberMe");

    // verify if is current user profile or not
    if (rememberMe === 'true')
      this.justViewProfile = localStorage.getItem("Verificare_User_Profile");
    else
      this.justViewProfile = sessionStorage.getItem("Verificare_User_Profile");

    this.rol = localStorage.getItem("Rol") !== null ? localStorage.getItem("Rol") : sessionStorage.getItem("Rol");
    this.rol = this.rol === null ? '' : this.rol;
    

    // is not current user profile
    if (this.justViewProfile === 'true') {
      if(this.rol === "mentor"){
        this.rol = "student"; 
        this.reviewService.getStudentAllReviewsReceive(this.email).subscribe(
        (result: ReviewViewStudent[]) => {
          this.reviews = result;
        },
        (error) => {
          console.error(error);
        }
        );

      }
      else {
        this.rol = "mentor";  
        this.reviewService.getMentorAllReviewsReceive(this.email).subscribe(
          (result: ReviewViewMentor[]) => {
            this.reviewsMentor = result;
          },
          (error) => {
            console.error(error);
          }
          );
      }
    }
    else{
      if(this.rol === "student"){
       
        this.reviewService.getStudentAllReviewsReceive(this.email).subscribe(
        (result: ReviewViewStudent[]) => {
          this.reviews = result;
        },
        (error) => {
          console.error(error);
        }
        );

      }
      else {
         
        this.reviewService.getMentorAllReviewsReceive(this.email).subscribe(
          (result: ReviewViewMentor[]) => {
            this.reviewsMentor = result;
          },
          (error) => {
            console.error(error);
          }
          );
      }
    }
  }

  getAllUserRequestsAndCreateChart() {
    this.mentorRequestService.GetAllRequests(this.email!).subscribe(res => {
      this.requests = res;

      this.chartOptions = {
        series: [
          this.requests.filter((x: { status: string; }) => x.status.toLowerCase() === "accepted").length,
          this.requests.filter((x: { status: string; }) => x.status.toLowerCase() === "waiting").length,
          this.requests.filter((x: { status: string; }) => x.status.toLowerCase() === "rejected").length],
        chart: {
          width: 600,
          type: "pie",
          events: {
            dataPointSelection: (event: any, chartContext: any, config: any) => {
              if (config.w.config.labels[config.dataPointIndex] === "Accepted") {
                this.router.navigate(["/my-students"]);
              }
              if (config.w.config.labels[config.dataPointIndex] === "Waiting") {
                this.router.navigate(["/requests"]);
              }
            }
          }
        },
        labels: ["Accepted", "Waiting", "Rejected"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            },
            
          }
        ]
      };
    });
  }

  getUserRequests() {
    this.mentorRequestService.GetUserRequests(this.email!).subscribe(res => {
      this.notifications = res.length;
    });
  }

  getUserInfo() {
    this.userAccountService
      .GetUserInfoWithAddressByEmail(this.email!, this.rol!)
      .subscribe(res => {
        this.userAccountWithAddress = res;
        this.rating = res.numberOfStars;

        let rememberMe = localStorage.getItem("rememberMe");

        if (rememberMe === 'true')
          localStorage.setItem("Verificare_User_Profile", "");
        else 
          sessionStorage.setItem("Verificare_User_Profile", "");
      });
  }

  ngOnInit() {
  }

  public delete(email: any): void {
    this.userAccountService.SoftDeleteUserByEmail(email).subscribe(result => {
      console.log(result);
    });
  }
}
