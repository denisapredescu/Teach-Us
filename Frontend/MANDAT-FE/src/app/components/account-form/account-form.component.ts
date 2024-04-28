import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
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


export class CustomValidators {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      console.log(source, target, control.value)
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      console.log(sourceCtrl?.value)
      console.log(targetCtrl?.value)
      console.log(sourceCtrl?.value !== targetCtrl?.value)

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }
}

@Component({
  selector: "app-account-form",
  templateUrl: "./account-form.component.html",
  styleUrls: ["./account-form.component.scss"],
})
export class AccountFormComponent {
  public accountModel: FormGroup;
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

  hidePassword = true;
  hideRepeatPassword = true;

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl("", [
    Validators.required,
    Validators.pattern("^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$"),
  ]);

  repeatPasswordFormControl = new FormControl("", [
    Validators.required,
    Validators.pattern("^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$"),
  ]);

  phoneFormControl = new FormControl("", [
    Validators.maxLength(10),
    Validators.minLength(10)
  ]);

  roleFormControl = new FormControl("", [
    Validators.required
  ]);

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
          this.model = res;
          [this.model.firstName, this.model.lastName] = res.username.split(" ");
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
      model: this.model,
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