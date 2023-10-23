import { Component } from "@angular/core";
import { HomeCard, HomeCards } from "src/app/constants/home-card";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent {
  cards: HomeCard[] = HomeCards;
}
