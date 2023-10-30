import { Component, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { BreakpointObserver } from "@angular/cdk/layout";
import { SocialUser, SocialAuthService } from "@abacritt/angularx-social-login";
import { UserAccountService } from "src/app/services/user-account.service";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { FormBuilder } from "@angular/forms";
import { Roles } from "src/app/constants/roles";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  socialUser!: SocialUser;
  isLoggedin?: string;
  name?: string;
  rol?: string;
  roles: Roles = new Roles();
  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private formBuilder: FormBuilder,
    public socialAuthService: SocialAuthService,
    private cookieService: CookieService,
    private accountService: UserAccountService
  ) {}

  ngOnInit(): void {
    this.isLoggedin = this.cookieService.get("LoggedIn");
    if (this.isLoggedin !== "") {
      this.name = this.cookieService.get("Nume");
      this.rol = this.cookieService.get("Rol");
    }
  }
  public myMentors(): void {
    this.router.navigate(["my-mentors"]);
  }

  logOut(): any {
    sessionStorage.clear();
    localStorage.clear();
    this.cookieService.deleteAll();
    this.router.navigate(["/home"]);
    this.isLoggedin = "";
  }
  
  ngAfterViewInit() {}

  public myStudents(): void {
    this.router.navigate(["my-students"]);
  }
}
