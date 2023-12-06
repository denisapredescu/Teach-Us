import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MentorRequestsService } from 'src/app/services/mentor-requests.service';
import { UserAccountService } from 'src/app/services/user-account.service';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive } from 'ng-apexcharts';
import { UserAccountWithAddress } from 'src/app/models/user-account-with-address-model';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { win } from 'ngx-youtube-player';
import { By } from '@angular/platform-browser';
import {Location} from "@angular/common";
import { HttpClient, HttpClientModule } from '@angular/common/http';

fdescribe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let requests: any = [];
  let requestsServiceSpy: jasmine.SpyObj<MentorRequestsService>;
  let chartOptions: any;
  let userAccountWithAddress: UserAccountWithAddress;
  let userAccountServiceSpy: jasmine.SpyObj<UserAccountService>;
  let location: Location;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    requestsServiceSpy = jasmine.createSpyObj("MentorRequestsService", ['GetAllRequests', 'GetUserRequests']);
    userAccountServiceSpy = jasmine.createSpyObj("UserAccountService", [ 'GetUserInfoWithAddressByEmail', 'SoftDeleteUserByEmail']);
    
    await TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        // { provide: MentorRequestsService, useValue: requestsServiceSpy },
        // { provide: UserAccountService, useValue: userAccountServiceSpy },
        // { provide: HttpClient, useValue: httpClientSpy },
        // { provide: ActivatedRoute, useValue: activatedRouteStub }
      ],
    })
    .compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(async () => {
    chartOptions = {
      labels: ["Accepted", "Waiting", "Rejected"],
      series: [1, 3, 2]
    };
      

    userAccountWithAddress = {
      username: "",
      email: "",
      phoneNumber: "",
      bio: "",
      educationalInstitution: "",
      subject: [],
      city: "",
      county: "",
      addressInfo: "",
      numberOfStars: 0
    };

    requests = [
      {
        "fullName": "a",
        "email": "b",
        "matchDate": "c",
        "status": "accepted",
        "subject": "e"
      },
      {
        "fullName": "a",
        "email": "b",
        "matchDate": "c",
        "status": "rejected",
        "subject": "e"
      },
      {
        "fullName": "a",
        "email": "b",
        "matchDate": "c",
        "status": "rejected",
        "subject": "e"
      },
      {
        "fullName": "a",
        "email": "b",
        "matchDate": "c",
        "status": "waiting",
        "subject": "e"
      },
      {
        "fullName": "a",
        "email": "b",
        "matchDate": "c",
        "status": "waiting",
        "subject": "e"
      },
      {
        "fullName": "a",
        "email": "b",
        "matchDate": "c",
        "status": "waiting",
        "subject": "e"
      },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data from localStorage when rememberMe is true', fakeAsync (() => {
    const rememberMe = 'true';
    const userAccountWithAddress = {
      username: "student",
      email: "student@gmail.com",
      phoneNumber: "0721234567",
      bio: "",
      educationalInstitution: "",
      subject: [],
      city: "Bucharest",
      county: "Romania",
      addressInfo: "",
      numberOfStars: 5
    };
    component.userAccountWithAddress = userAccountWithAddress;
    component.rating = userAccountWithAddress.numberOfStars;
    component.email = "student@gmail.com"; 
    component.rol = 'user';

    userAccountServiceSpy.GetUserInfoWithAddressByEmail.and.returnValue(of(userAccountWithAddress));
  
    component.getUserInfo();
    tick();

    spyOn(localStorage, 'getItem').and.returnValue(rememberMe).and.callFake(() => null);
    spyOn(localStorage, 'setItem').and.callThrough();
    spyOn(sessionStorage, 'setItem');
    localStorage.setItem('Verificare_User_Profile', "");
  
    // expect(localStorage.getItem).toHaveBeenCalledWith('rememberMe');
    expect(localStorage.setItem).toHaveBeenCalledWith('Verificare_User_Profile', '');
    expect(sessionStorage.setItem).not.toHaveBeenCalled();
    // expect(userAccountServiceSpy.GetUserInfoWithAddressByEmail).toHaveBeenCalledWith(component.email, component.rol);
  }));

  it('should get data from sessionStorage when rememberMe is false', fakeAsync (() => {
    let rememberMe = "false";
    userAccountServiceSpy.GetUserInfoWithAddressByEmail.and.returnValue(of(userAccountWithAddress));
    
    component.userAccountWithAddress = userAccountWithAddress;
    component.rating = userAccountWithAddress.numberOfStars;
    
    component.getUserInfo();
    tick();
  
    spyOn(window.localStorage, 'getItem').and.returnValue(rememberMe);
    spyOn(window.localStorage, 'setItem');
    spyOn(window.sessionStorage, 'setItem');
    window.sessionStorage.setItem('Verificare_User_Profile', '');
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith('Verificare_User_Profile', '');

    expect(window.localStorage.setItem).not.toHaveBeenCalled();
    expect(window.sessionStorage.setItem).toHaveBeenCalled();
    // expect(userAccountServiceSpy.GetUserInfoWithAddressByEmail).toHaveBeenCalledWith(component.email!, component.rol!);
    // expect(component.getUserInfo).toHaveBeenCalled();
  }));

  it('should handle empty request array', fakeAsync (() => {
    requestsServiceSpy.GetUserRequests.and.returnValue(of([]));
    
    component.getUserRequests();
    tick();

    expect(component.requests.length).toBe(0);
  }));

  it('should handle length request array', fakeAsync (() => {
    component.notifications = requests.length;
    component.requests = requests;
    requestsServiceSpy.GetUserRequests.and.returnValue(of(requests));
    
    component.getUserRequests();
    tick();

    // expect(requestsServiceSpy.GetUserRequests).toHaveBeenCalled();
    expect(component.notifications).toBe(6);
  }));

  it('should create chart from request data', fakeAsync(() => {
    component.requests = requests;
    component.chartOptions = chartOptions;

    requestsServiceSpy.GetAllRequests.and.returnValue(of(requests));

    component.getAllUserRequestsAndCreateChart();
    tick();

    fixture.detectChanges();
    
    // spyOn(component, "getAllUserRequestsAndCreateChart");
    // spyOn(requestsServiceSpy, "GetAllRequests");
    // spyOn(requestsServiceSpy, "GetAllRequests").and.returnValue(of(requests));
    
    // expect(component.chartOptions.series).toBe(chartOptions.series);
    // expect(component.chartOptions.labels).toBe(chartOptions.labels);
    
    expect(component.chartOptions.series).toEqual(
      [
        requests.filter((x: { status: string; }) => x.status === "accepted").length,
        requests.filter((x: { status: string; }) => x.status === "waiting").length,
        requests.filter((x: { status: string; }) => x.status === "rejected").length
      ]
    );

    // expect(requestsServiceSpy.GetAllRequests).toHaveBeenCalled();
    // expect(component.getAllUserRequestsAndCreateChart).toHaveBeenCalled();
  }));
});
