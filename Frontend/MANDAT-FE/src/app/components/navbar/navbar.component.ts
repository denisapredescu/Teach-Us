import { Component, Input } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { SocialUser, SocialAuthService } from "@abacritt/angularx-social-login";
import { Router } from "@angular/router";
import { Roles } from "src/app/constants/roles";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  @Input() sidenav: MatSidenav;

  socialUser!: SocialUser;
  isLoggedin?: string | null;
  name?: string | null;
  rol?: string | null;
  rol1?: string;
  roles: Roles = new Roles();

  constructor(
    private router: Router,
    public socialAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedin =
      localStorage.getItem("LoggedIn") !== null
        ? localStorage.getItem("LoggedIn")
        : sessionStorage.getItem("LoggedIn");
    if (this.isLoggedin !== "" && this.isLoggedin !== null) {
      this.name =
        localStorage.getItem("Nume") !== null
          ? localStorage.getItem("Nume")
          : sessionStorage.getItem("Nume");
      this.rol =
        localStorage.getItem("Rol") !== null
          ? localStorage.getItem("Rol")
          : sessionStorage.getItem("Rol");

      if (this.rol === "mentor") this.rol1 = "teacher";
      else this.rol1 = this.rol ?? "";
    }
  }

  closeSidenavAndNavigate(link: string) {
    this.router.navigate([link]);
    this.sidenav.close();
  }

  public myMentors(): void {
    this.router.navigate(["my-mentors"]);
    this.sidenav.close();
  }

  logOut(): any {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(["/home"]);
    this.isLoggedin = "";
    this.sidenav.close();
  }

  ngAfterViewInit() {}

  public myStudents(): void {
    this.router.navigate(["my-students"]);
    this.sidenav.close();
  }

  public redirectToProfile() {
    let rememberMe = localStorage.getItem("rememberMe");

    if (rememberMe === "true")
      localStorage.setItem("Verificare_User_Profile", "false");
    else sessionStorage.setItem("Verificare_User_Profile", "false");

    this.router.navigate(["/user-profile"]);
  }
}
