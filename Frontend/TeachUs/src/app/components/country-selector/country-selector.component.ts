import { Component, Input } from "@angular/core";

@Component({
  selector: "app-country-selector",
  templateUrl: "./country-selector.component.html",
  styleUrls: ["./country-selector.component.scss"],
})
export class CountrySelectorComponent {
  @Input() label: string = "";
}
