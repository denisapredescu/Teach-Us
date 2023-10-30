import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MaterialInputComponent } from "./material-input.component";

describe("MaterialInputComponent", () => {
  let component: MaterialInputComponent;
  let fixture: ComponentFixture<MaterialInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
