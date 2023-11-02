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
    public socialAuthService: SocialAuthService,
  ) {}

  ngOnInit(): void {
    this.isLoggedin = localStorage.getItem("LoggedIn") !== '' ? localStorage.getItem("LoggedIn") : sessionStorage.getItem("LoggedIn");
    if (this.isLoggedin !== '') {
      this.name = localStorage.getItem("Nume") !== '' ? localStorage.getItem("Nume") : sessionStorage.getItem("Nume");;
      this.rol = localStorage.getItem("Rol") !== '' ? localStorage.getItem("Rol") : sessionStorage.getItem("Rol");;
      
      if(this.rol === "mentor")
        this.rol1 = "teacher";
    }
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
}
