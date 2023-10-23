import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MaterialEmailComponent } from "./material-email.component";

describe("MaterialEmailComponent", () => {
  let component: MaterialEmailComponent;
  let fixture: ComponentFixture<MaterialEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialEmailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
