import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAnnouncementsComponent } from './my-announcements.component';

describe('MyAnnouncementsComponent', () => {
  let component: MyAnnouncementsComponent;
  let fixture: ComponentFixture<MyAnnouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAnnouncementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
