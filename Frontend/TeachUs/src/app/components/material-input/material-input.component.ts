import { Component, Input } from "@angular/core";
import { RegisterModel } from "src/app/models/register-model";


@Component({
  selector: "app-material-input",
  templateUrl: "./material-input.component.html",
  styleUrls: ["./material-input.component.scss"],
})
export class MaterialInputComponent {
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Input() type: string = "text";
  @Input() model: RegisterModel = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    county: "",
    city: "",
    addressInfo: "",
    role: "",
    bio: "",
    phoneNumber: "",
    educationalInstitution: "",
  };
}
