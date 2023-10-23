import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AccountFormDetails } from "src/app/constants/account-form-details";
import { AccountFormModel, AccountModel } from "src/app/models/account-model";
import { UserAccountService } from "src/app/services/user-account.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-account-form",
  templateUrl: "./account-form.component.html",
  styleUrls: ["./account-form.component.scss"],
})
export class AccountFormComponent {
  public model: AccountModel = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    repeatPassword: "",
    county: "",
    city: "",
    addressInfo: "",
    role: "",
    bio: "",
    phoneNumber: "",
    educationalInstitution: "",
  };

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl("", [
    Validators.required,
    Validators.pattern("^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$"),
  ]);

  matcher = new MyErrorStateMatcher();
  accountTypes: string[] = ["Student", "Mentor"];
  email: string;
  @Input() accountFormDetails: AccountFormDetails;
  @Output() submitEmitter = new EventEmitter<AccountFormModel>();
  @Output() deleteEmitter = new EventEmitter<string>();

  constructor(
    private userAccountService: UserAccountService,
    private cookieService: CookieService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    if (this.router.url.startsWith("/settings")) {
      this.activatedRoute.paramMap.subscribe(params => {
        this.email = params.get("email") || "";
      });
      if (this.email === "") {
        this.email = this.cookieService.get("Email");
      }

      userAccountService
        .GetUserInfoWithAddressByEmail(this.email, this.cookieService.get("Rol"))
        .subscribe(res => {
          this.model = res;
          [this.model.firstName, this.model.lastName] = res.username.split(" ");
        });
    }
  }

  submit(): void {
    const accountFormModel: AccountFormModel = {
      userEmail: this.email,
      model: this.model,
    };
    this.submitEmitter.emit(accountFormModel);
  }

  delete(): void {
    this.deleteEmitter.emit(this.email);
  }

  isRegisterPage(): boolean {
    return this.accountFormDetails.pageUrl === "/register";
  }

  isSettingsPage(): boolean {
    return this.accountFormDetails.pageUrl == "/settings";
  }
}
