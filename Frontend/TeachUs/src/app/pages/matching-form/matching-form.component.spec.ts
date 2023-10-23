import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatchingFormComponent } from "./matching-form.component";

fdescribe("MatchingFormComponent", () => {
  let component: MatchingFormComponent;
  let fixture: ComponentFixture<MatchingFormComponent>;
  let cookieService: CookieService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
       MatFormFieldModule,
       MatInputModule,
       MatSelectModule,
       FormsModule,
       BrowserAnimationsModule,
       ],
      declarations: [MatchingFormComponent], 
      providers: [CookieService, { provide: Router,}],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('should call match page when clicked', fakeAsync(() => {
    spyOn(component, 'match');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(component.match).toHaveBeenCalled();
 
  }));

});
