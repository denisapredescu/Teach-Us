import {
  FacebookLoginProvider,
  SocialAuthService,
  SocialUser,
} from "@abacritt/angularx-social-login";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { MyErrorStateMatcher } from "src/app/components/account-form/account-form.component";
import { UserAccountService } from "src/app/services/user-account.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public socialAuthService: SocialAuthService,
    private userAccount: UserAccountService,
    private cookieService: CookieService
  ) {
    this.model = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      rememberMe: [false],
    });
  }
  email = new FormControl("", [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  public model: FormGroup;

  Login(): void {
    let data = {
      password: this.model.get("password")?.value,
      email: this.model.get("email")?.value,
    };
    this.userAccount.Login(data).subscribe(
      result => {
        console.log(result);
        this.isLoggedin = true;
        this.userAccount
          .GetUserInfo(this.model.get("email")?.value)
          .subscribe(details => {
            this.cookieService.set("Email", details.email);
            this.cookieService.set("Nume", details.name);
            this.cookieService.set("Rol", details.roles);
            this.cookieService.set("LoggedIn", "true");
          });

        this.cookieService.set("Token", result.token);

        this.router.navigate(["/home"]);
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      },

      error => {
        console.log(error);
      }
    );
  }
  loginWithFacebook(): void {
    console.log(
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
    );
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(res => {
        console.log(res);
      });
  }
  logOut(): any {
    // ramane navbarul neactualizat
    this.socialAuthService.signOut();
    window.location.reload();
  }
}
