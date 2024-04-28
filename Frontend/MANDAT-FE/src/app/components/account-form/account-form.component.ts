import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountFormDetails } from "src/app/constants/account-form-details";
import { AccountFormModel } from "src/app/models/account-model";
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
  public accountModel: FormGroup = this.formBuilder.group({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    userName: new FormControl(""),
    email: new FormControl("", [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern("^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$"),
    ]),
    repeatPassword: new FormControl("", [
      Validators.required
    ]),
    county: new FormControl(""),
    city: new FormControl(""),
    addressInfo: new FormControl(""),
    role: new FormControl("", [
      Validators.required
    ]),
    bio: new FormControl(""),
    phoneNumber: new FormControl(""),
    educationalInstitution: new FormControl("")
  }, 
  {
    validator: this.ConfirmedValidator('password', 'repeatPassword')
  }
);

  hidePassword: boolean = true;
  hideRepeatPassword: boolean = true;
  matcher = new MyErrorStateMatcher();
  accountTypes: string[] = ["Student", "Mentor"];
  email: string | null;
  rol: string | null;

  @Input() accountFormDetails: AccountFormDetails;
  @Output() submitEmitter = new EventEmitter<AccountFormModel>();
  @Output() deleteEmitter = new EventEmitter<string>();

  constructor(
    private userAccountService: UserAccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.rol = localStorage.getItem("Rol");
    this.email = localStorage.getItem("Email");
    if (this.router.url.startsWith("/settings")) {
      this.activatedRoute.paramMap.subscribe(params => {
        this.email = params.get("email") || "";
      });
      if (this.email === "") {
        this.email = localStorage.getItem("Email");
      }
      if(this.email != null && this.rol != null){
        this.userAccountService
        .GetUserInfoWithAddressByEmail(this.email, this.rol)
        .subscribe(res => {
          this.accountModel.controls["email"].setValue(res.email);
          this.accountModel.controls["userName"].setValue(res.username);
          this.accountModel.controls["phoneNumber"].setValue(res.phoneNumber);
          this.accountModel.controls["bio"].setValue(res.bio);;
          this.accountModel.controls["educationalInstitution"].setValue(res.educationalInstitution);
          this.accountModel.controls["city"].setValue(res.city);
          this.accountModel.controls["county"].setValue(res.county);
          this.accountModel.controls["addressInfo"].setValue(res.addressInfo);
          this.accountModel.controls["role"].setValue(this.rol);
          var name = res.username.split(" ");
          this.accountModel.controls["firstName"].setValue(name[0]);
          this.accountModel.controls["lastName"].setValue(name[1]);
        });
      }
    }
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors["confirmedValidator"]
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  submit(): void {
    console.log(this.email)
    if(this.email != null){
      console.log(this.accountModel.value)
      const accountFormModel: AccountFormModel = {
        userEmail: this.email,
        model: this.accountModel.value,
      };
      this.submitEmitter.emit(accountFormModel);
    }
  }

  delete(): void {
    if(this.email != null){
      this.deleteEmitter.emit(this.email);
    }
  }

  resetPassword(): void {
    if(this.email != null)
      this.router.navigate(["/reset-password"])
  }

  isRegisterPage(): boolean {
    return this.accountFormDetails.pageUrl === "/register";
  }

  isSettingsPage(): boolean {
    return this.accountFormDetails.pageUrl === "/settings";
  }

  isResetPasswordPage(): boolean {
    return this.accountFormDetails.pageUrl === "/reset-password";
  }
}