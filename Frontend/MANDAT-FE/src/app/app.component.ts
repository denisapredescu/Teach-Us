import { Component, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { SocialUser, SocialAuthService } from "@abacritt/angularx-social-login";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  @ViewChild("matSidenav")
  sidenav: MatSidenav;
  title = "MANDAT-FE";
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public socialAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
    this.socialAuthService.authState.subscribe(user => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      this.router.navigate(["/home"]);
    });
    var t = this.isLoggedin;
  }
}

