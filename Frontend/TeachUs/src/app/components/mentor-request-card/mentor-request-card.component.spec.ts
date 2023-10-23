import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorRequestCardComponent } from './mentor-request-card.component';

describe('MentorRequestCardComponent', () => {
  let component: MentorRequestCardComponent;
  let fixture: ComponentFixture<MentorRequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorRequestCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
