import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { CardComponent } from "./card.component";
import { StudentModel } from "../../models/student-model";
import { MentorModel } from "../../models/mentor-model";

describe("CardComponent", () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
