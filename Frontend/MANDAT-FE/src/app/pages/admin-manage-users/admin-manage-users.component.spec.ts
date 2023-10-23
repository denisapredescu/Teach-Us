import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageUsersComponent } from './admin-manage-users.component';

describe('AdminManageUsersComponent', () => {
  let component: AdminManageUsersComponent;
  let fixture: ComponentFixture<AdminManageUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManageUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManageUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
