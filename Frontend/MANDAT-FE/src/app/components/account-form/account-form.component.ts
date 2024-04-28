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
  public accountModel: FormGroup;

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
      this.accountModel = this.formBuilder.group({
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

    this.rol = localStorage.getItem("Rol");
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
          this.accountModel.value.email = res.email;
          this.accountModel.value.userName = res.username;
          this.accountModel.value.phoneNumber = res.phoneNumber;
          this.accountModel.value.bio = res.bio;
          this.accountModel.value.educationalInstitution = res.educationalInstitution;
          this.accountModel.value.city = res.city;
          this.accountModel.value.county = res.county;
          this.accountModel.value.addressInfo = res.addressInfo;
          this.accountModel.value.role = this.rol;
          [this.accountModel.value.firstName, this.accountModel.value.lastName] = res.username.split(" ");
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
    if(this.email != null){
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

  isRegisterPage(): boolean {
    return this.accountFormDetails.pageUrl === "/register";
  }

  isSettingsPage(): boolean {
    return this.accountFormDetails.pageUrl == "/settings";
  }
}