import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddReviewByMentorComponent } from './dialog-add-review-by-mentor.component';

describe('DialogAddReviewByMentorComponent', () => {
  let component: DialogAddReviewByMentorComponent;
  let fixture: ComponentFixture<DialogAddReviewByMentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddReviewByMentorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddReviewByMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
