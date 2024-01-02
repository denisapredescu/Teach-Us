import { ComponentFixture, TestBed, discardPeriodicTasks, fakeAsync, flush, flushMicrotasks, tick } from '@angular/core/testing';
import { Router, RouterModule, Routes } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SettingsComponent } from './settings.component';
import { UserAccountService } from 'src/app/services/user-account.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AccountFormComponent } from 'src/app/components/account-form/account-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { of } from 'rxjs';
import { LoginComponent } from '../login/login.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let userAccountServiceSpy: jasmine.SpyObj<UserAccountService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;
  let router: Router;


  beforeEach(() => {

    userAccountServiceSpy = jasmine.createSpyObj('UserAccountService', ['SoftDeleteUserByEmail', 'UpdateUserInfoWithAddressByEmail']);
    cookieServiceSpy = jasmine.createSpyObj('CookieService', ['']);
    
    TestBed.configureTestingModule({
      declarations: [
        SettingsComponent,
        AccountFormComponent,
      ],
      imports: [
        RouterTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
        ]),
        RouterModule,
        HttpClientModule,
        MatFormFieldModule,
        ],
      providers: [
        { provide: UserAccountService, useValue: userAccountServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete user account and navigate to login page', fakeAsync(() => {
    const email = 'test@example.com';

    userAccountServiceSpy.SoftDeleteUserByEmail.and.returnValue(of({}));

    component.deleteUserAccount(email);

    expect(userAccountServiceSpy.SoftDeleteUserByEmail).toHaveBeenCalledWith(email);
  
  }));


  it('should update account details', fakeAsync(() => {
    // Mock data
    const email = 'test@gmail.com';
    const accountFormModel = {
      userEmail: 'test@gmail.com',
      model:{
      firstName: "Popescu",
      lastName: "Dan",
      userName: "danpop",
      email: "test@gmail.com",
      password: "1",
      repeatPassword: "1",
      county: "Ro",
      city: "B",
      addressInfo: "B43",
      role: "student",
      bio: "B",
      phoneNumber: "0744444444",
      educationalInstitution: "TCS",
    }
  };

    // Mock the UpdateUserInfoWithAddressByEmail method to return a dummy observable
    userAccountServiceSpy.UpdateUserInfoWithAddressByEmail.and.returnValue(of({
      userEmail: 'test@gmail.com',
      model:{
      firstName: "Popescu",
      lastName: "Dan",
      userName: "danpop",
      email: "test@gmail.com",
      password: "1",
      repeatPassword: "1",
      county: "Ro",
      city: "B",
      addressInfo: "B43",
      role: "student",
      bio: "BBBBB",
      phoneNumber: "0744444444",
      educationalInstitution: "TCS",
    }
  }));


    // Call the updateAccountDetails method
    component.updateAccountDetails(accountFormModel);

    expect(userAccountServiceSpy.UpdateUserInfoWithAddressByEmail).toHaveBeenCalled();
  }));

});
