import { Component, OnInit, ViewChild } from "@angular/core";
import { UserAccountService } from "src/app/services/user-account.service";
import { UserAccountWithAddress } from "src/app/models/user-account-with-address-model";
import { CookieService } from "ngx-cookie-service";
import { MentorRequestsService } from "src/app/services/mentor-requests.service";
import { Roles } from "src/app/constants/roles";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

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
  email: string;
  rating: number;
  rol: string;
  roles: Roles = new Roles();
  isPersonalProfile: boolean = false;
  requests: any = [];

  requestsMock: any = [
    {
      "fullName": "a",
      "email": "b",
      "matchDate": "c",
      "status": "accepted",
      "subject": "e"
    },
    {
      "fullName": "a",
      "email": "b",
      "matchDate": "c",
      "status": "rejected",
      "subject": "e"
    },
    {
      "fullName": "a",
      "email": "b",
      "matchDate": "c",
      "status": "rejected",
      "subject": "e"
    },
    {
      "fullName": "a",
      "email": "b",
      "matchDate": "c",
      "status": "waiting",
      "subject": "e"
    },
    {
      "fullName": "a",
      "email": "b",
      "matchDate": "c",
      "status": "waiting",
      "subject": "e"
    },
    {
      "fullName": "a",
      "email": "b",
      "matchDate": "c",
      "status": "waiting",
      "subject": "e"
    },

  ]

  constructor(
    private userAccountService: UserAccountService,
    private mentorRequestService: MentorRequestsService,
    private activatedRoute: ActivatedRoute,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.email = params.get("email") || "";
    });

    if (this.email === "") {
      this.isPersonalProfile = true;
      this.email = this.cookieService.get("Email");
    }
    if(this.cookieService.get("Verificare_User_Profile") == ""){
      this.rol = cookieService.get("Rol");
    }
    else{
      if(cookieService.get("Rol") !== "mentor"){
        this.rol = "student";       
      }
      else{
        this.rol = "mentor";  
      }
    }
    
    this.userAccountService
      .GetUserInfoWithAddressByEmail(this.email, this.rol)
      .subscribe(res => {
        this.userAccountWithAddress = res;
        this.rating = res.numberOfStars;
        this.cookieService.set("Verificare_User_Profile", "");
      });

    this.mentorRequestService.GetUserRequests(this.email).subscribe(res => {
      this.notifications = res.length;
    });

    this.mentorRequestService.GetAllRequests(this.email).subscribe(res => {
      this.requests = res;

      this.chartOptions = {
        series: [
          this.requestsMock.filter((x: { status: string; }) => x.status === "accepted").length,
          this.requestsMock.filter((x: { status: string; }) => x.status === "waiting").length,
          this.requestsMock.filter((x: { status: string; }) => x.status === "rejected").length],
        chart: {
          width: 600,
          type: "pie",
          events: {
            dataPointSelection: (event: any, chartContext: any, config: any) => {
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

  ngOnInit() {
    const address = `${this.userAccountWithAddress.addressInfo}, ${this.userAccountWithAddress.city}, ${this.userAccountWithAddress.county}`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&address=${address}`;
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        const location = data.results[0]?.geometry.location;

        let latitude = location !== undefined ? location.lat : -34.397;
        let longitude = location !== undefined ? location.lng : 150.644;

        const map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: latitude, lng: longitude },
          zoom: 8,
        });

        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(
          { address: address },
          (results: { geometry: { location: any } }[], status: string) => {
            if (status === "OK") {
              map.setCenter(results[0].geometry.location);
              const marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
              });
            } else {
              console.log(
                `Geocode was not successful for the following reason: ${status}`
              );
            }
          }
        );
      });
  }
}
