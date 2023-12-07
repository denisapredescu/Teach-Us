import {
  // FacebookLoginProvider,
  // SocialAuthService,
  // SocialUser,
} from "@abacritt/angularx-social-login";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { MyErrorStateMatcher } from "src/app/components/account-form/account-form.component";
import { UserAccountService } from "src/app/services/user-account.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  loginForm!: FormGroup;
  // socialUser!: SocialUser;
  isLoggedin?: boolean;
  isRememberMeChecked: boolean = true;
  email = new FormControl("", [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  public model: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    // public socialAuthService: SocialAuthService,
    private userAccount: UserAccountService
  ) {
    this.model = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      rememberMe: [false],
    });
  }

  public changeState() {
    this.isRememberMeChecked = !this.isRememberMeChecked;
  }

  LoginUser(): void {
    let data = {
      password: this.model.get("password")?.value,
      email: this.model.get("email")?.value,
    };
    this.userAccount.Login(data).subscribe(
      result => {
        this.isLoggedin = true;
        this.userAccount.GetUserInfo(this.model.get("email")?.value).subscribe(details => {
          if(this.isRememberMeChecked)  {
            localStorage.setItem("Email", details.email);
            localStorage.setItem("Nume", details.name);
            localStorage.setItem("Rol", details.roles);
            localStorage.setItem("LoggedIn", "true");
            localStorage.setItem("Token", result.token);
          } else {
            sessionStorage.setItem("Email", details.email);
            sessionStorage.setItem("Nume", details.name);
            sessionStorage.setItem("Rol", details.roles);
            sessionStorage.setItem("LoggedIn", "true");
            sessionStorage.setItem("Token", result.token);
          }
          localStorage.setItem("rememberMe", this.isRememberMeChecked.toString());
        });

        this.navigateToHome();
        
      },

      error => {
        console.log(error);
      }
    );

  }
  navigateToHome() {
    this.router.navigate(["/home"]);
    setTimeout( () => {
      this.reloadPage();
    }, 1000);
  }

  public reloadPage(): void {
    window.location.reload();
  }
}
