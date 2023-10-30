import { Component, Input, ViewChild } from "@angular/core";
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
  @Input() sidenav: MatSidenav;
  
  socialUser!: SocialUser;
  isLoggedin?: string;
  name?: string;
  rol?: string;
  roles: Roles = new Roles();

  constructor(
    private router: Router,
    public socialAuthService: SocialAuthService,
    private cookieService: CookieService,
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
    this.sidenav.close();
  }

  logOut(): any {
    sessionStorage.clear();
    localStorage.clear();
    this.cookieService.deleteAll();
    this.router.navigate(["/home"]);
    this.isLoggedin = "";
    this.sidenav.close();
  }

  ngAfterViewInit() {}

  public myStudents(): void {
    this.router.navigate(["my-students"]);
    this.sidenav.close();
  }
}
