import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertOptions } from 'src/app/alert/alert.model';
import { AlertService } from 'src/app/alert/alert.service';
import { UserAccountService } from 'src/app/services/user-account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  public model: FormGroup = this.formBuilder.group({
      email: "",
      password: new FormControl("", [
        Validators.required,
        Validators.pattern("^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$"),
      ]),
      repeatPassword: new FormControl("", [
        Validators.required
      ])
    },
    {
      validator: this.ConfirmedValidator('password', 'repeatPassword')
    }
  );

  hidePassword: boolean = true;
  hideRepeatPassword: boolean = true;
  email: string | null;
  options: AlertOptions = {
    autoClose: false,
    keepAfterRouteChange: false
 };

  constructor(
    private userAccountService: UserAccountService,
    private router: Router,
    private formBuilder: FormBuilder,
    public alertService: AlertService
  ) {
    this.email = localStorage.getItem("Email");
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

  response: number = 0;
  submit(): void {
    if(this.email != null){
      this.model.controls["email"].setValue(this.email);

      this.userAccountService
        .ResetPassword(this.model.value).subscribe(
        (res: boolean) => {
          var options: AlertOptions = {
            autoClose: false,
            keepAfterRouteChange: true
         };
         this.response = 1;
          this.alertService.success("Password modified!", options);
          console.log("success")
          this.router.navigate(["/settings"]);
        },
        (error) => {
          var options: AlertOptions = {
            autoClose: true,
            keepAfterRouteChange: false
         };
         this.response = -1;
          console.log(error.error)
          this.alertService.error(error.error + "! Please login again!", options);
          this.model.controls["password"].setValue(null);
          this.model.controls["repeatPassword"].setValue(null);
        }
      );
    }
  }
}
