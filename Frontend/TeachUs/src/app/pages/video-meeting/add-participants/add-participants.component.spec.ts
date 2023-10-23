import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParticipantsComponent } from './add-participants.component';

describe('AddParticipantsComponent', () => {
  let component: AddParticipantsComponent;
  let fixture: ComponentFixture<AddParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddParticipantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
