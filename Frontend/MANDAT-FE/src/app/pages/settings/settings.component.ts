import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import {
  AccountFormDetails,
  SettingsAccountFormDetails,
} from "src/app/constants/account-form-details";
import { Roles } from "src/app/constants/roles";
import { AccountFormModel, AccountModel } from "src/app/models/account-model";
import { AccountService } from "src/app/services/account.service";
import { UserAccountService } from "src/app/services/user-account.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent {
  accountFormDetails: AccountFormDetails = SettingsAccountFormDetails;
  roles: Roles = new Roles();

  constructor(
    private userAccountService: UserAccountService,
    private accountService: AccountService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  updateAccountDetails(accountFormModel: AccountFormModel): void {
    const email = accountFormModel.userEmail;
    const model = accountFormModel.model;
    console.log(email);
    // console.log(model);
    model.userName = `${model.firstName} ${model.lastName}`;
    this.userAccountService
      .UpdateUserInfoWithAddressByEmail(email, model)
      .subscribe(
        result => {
          console.log(model);
          if (!this.roles.isAdmin(localStorage.getItem("Rol"))) {
            localStorage.setItem("Email", model.email);
            localStorage.setItem("Nume", model.userName);
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteUserAccount(email: string): void {
      this.userAccountService
        .SoftDeleteUserByEmail(email)
        .subscribe(result => {});

      sessionStorage.clear();
      localStorage.clear();

      this.router.navigate(["/login"]);
      setTimeout(function () {
        window.location.reload();
      }, 1000);
  }
}
