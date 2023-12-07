import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";

import { LoginComponent } from "./login.component";
import { UserAccountService } from "src/app/services/user-account.service";
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { RouterTestingModule } from "@angular/router/testing";
import { FormBuilder, FormControl, FormsModule, NgControl, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { Observable, of } from "rxjs";
import { HomePageComponent } from "../home-page/home-page.component";

fdescribe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userAccountServiceSpy: jasmine.SpyObj<UserAccountService>;
  let router: Router;
  let isRememberMeChecked: boolean = true;

  beforeEach(async () => {
    userAccountServiceSpy = jasmine.createSpyObj("UserAccountService", ["Login", "GetUserInfo"]);
    
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: HomePageComponent }
        ]),
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: UserAccountService, useValue: userAccountServiceSpy } 
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should change remember be value to true", fakeAsync (() => {
    isRememberMeChecked = false;
    component.isRememberMeChecked = isRememberMeChecked;
    component.changeState();
    tick();
    fixture.detectChanges();

    expect(component.isRememberMeChecked).toBe(true);
  }));

  it("should change remember be value to false", fakeAsync (() => {
    component.isRememberMeChecked = true;
    component.changeState();
    tick();
    fixture.detectChanges();

    expect(component.isRememberMeChecked).toBe(false);
  }));

  it("should set localStorage when isRememberMeChecked is true", fakeAsync (() => {
    component.isRememberMeChecked = true;
    component.isLoggedin = true;

    let data = {
      password: "Parola123!",
      email: "student@gmail.com"
    };

    let result = {
      token: "token"
    };

    let details = {
      Email: "student@gmail.com",
      Nume: "student",
      Rol: "student"
    };

    userAccountServiceSpy.Login.and.returnValue(of(result));
    userAccountServiceSpy.GetUserInfo.and.returnValue(of(details));

    component.LoginUser();
    tick();

    spyOn(window.localStorage, 'setItem');
    spyOn(window.sessionStorage, 'setItem');
    spyOn(router, 'navigate');
    const reloadSpy = spyOn(component, 'reloadPage');

    window.localStorage.setItem('Email', details.Email);
    window.localStorage.setItem('Nume', details.Nume);
    window.localStorage.setItem('Rol', details.Rol);
    window.localStorage.setItem('LoggedIn', "true");
    window.localStorage.setItem('Token', result.token);
    window.localStorage.setItem('rememberMe', isRememberMeChecked.toString());

    expect(window.localStorage.setItem).toHaveBeenCalledWith('Email', details.Email);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('Nume', details.Nume);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('Rol', details.Rol);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('LoggedIn', "true");
    expect(window.localStorage.setItem).toHaveBeenCalledWith('Token', result.token);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('rememberMe', isRememberMeChecked.toString());
    
    expect(component.isLoggedin).toBeTruthy();
    expect(component.isRememberMeChecked).toBeTruthy();
    expect(userAccountServiceSpy.Login).toHaveBeenCalled();
    expect(userAccountServiceSpy.GetUserInfo).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(sessionStorage.setItem).not.toHaveBeenCalled();

    component.navigateToHome();
    tick(1000);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
    expect(reloadSpy).toHaveBeenCalled();
  }));

  it("should set data to sessionStorage when isRememberMeChecked is false", fakeAsync (() => {
    component.isRememberMeChecked = false;
    component.isLoggedin = true;

    let data = {
      password: "Parola123!",
      email: "student@gmail.com"
    };

    let result = {
      token: "token"
    };

    let details = {
      Email: "student@gmail.com",
      Nume: "student",
      Rol: "student"
    };

    userAccountServiceSpy.Login.and.returnValue(of(result));
    userAccountServiceSpy.GetUserInfo.and.returnValue(of(details));

    component.LoginUser();
    tick();

    spyOn(window.localStorage, 'setItem');
    spyOn(window.sessionStorage, 'setItem');
    spyOn(router, 'navigate');
    const reloadSpy = spyOn(component, 'reloadPage');

    window.sessionStorage.setItem('Email', details.Email);
    window.sessionStorage.setItem('Nume', details.Nume);
    window.sessionStorage.setItem('Rol', details.Rol);
    window.sessionStorage.setItem('LoggedIn', "true");
    window.sessionStorage.setItem('Token', result.token);
    window.localStorage.setItem('rememberMe', isRememberMeChecked.toString());
    
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith('Email', details.Email);
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith('Nume', details.Nume);
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith('Rol', details.Rol);
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith('LoggedIn', "true");
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith('Token', result.token);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('rememberMe', isRememberMeChecked.toString());
    
    expect(component.isLoggedin).toBeTruthy();
    expect(component.isRememberMeChecked).toBeFalsy();
    expect(userAccountServiceSpy.Login).toHaveBeenCalled();
    expect(userAccountServiceSpy.GetUserInfo).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(sessionStorage.setItem).toHaveBeenCalled();

    component.navigateToHome();
    tick(1000);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
    expect(reloadSpy).toHaveBeenCalled();
  }));
});
