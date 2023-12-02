import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MyAnnouncementsComponent } from './my-announcements.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CardsListComponent } from 'src/app/components/cards-list/cards-list.component';
import { AnnouncementModel } from 'src/app/models/announcement-model';
import { of } from 'rxjs';
fdescribe('MyAnnouncementsComponent', () => {
  let component: MyAnnouncementsComponent;
  let fixture: ComponentFixture<MyAnnouncementsComponent>;
  let announcementList: AnnouncementModel[];
  let mockAnnouncementService: any;
  beforeEach(async () => {
    announcementList = [
      {
        id: "983B8363-55DC-4EDF-2D6E-08DB00C4CF1E",
        email: "clara@yahoo.com",
        subject: "History",
        description: "no",
        price: 3,
        meetingType: true
      },
      {
        id: "14344E97-7CC3-4687-E10F-08DB022F8B8F",
        email: "clara@yahoo.com",
        subject: "Geography",
        description: "geo",
        price: 50,
        meetingType: true
      },
      {
        id: "2161208B-DAFC-4597-A473-8D8719F82185",
        email: "mircea1@yahoo.com",
        subject: "Romanian",
        description: "desc",
        price: 100,
        meetingType: false
      },
    ]
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule],
      declarations: [ MyAnnouncementsComponent, CardsListComponent],
    })
    .compileComponents();
    mockAnnouncementService = jasmine.createSpyObj(['GetAllAnnouncmentWithEmail','DeleteAnnouncement'])
    fixture = TestBed.createComponent(MyAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete announcement by Id',fakeAsync (() => {
   component.announcements = announcementList;
   let cardList=[
    {
      id: "983B8363-55DC-4EDF-2D6E-08DB00C4CF1E",
      leftTitle: "History",
      mainTitle: "3 Lei",
      typeSubtitle: 
      {
        key: "Online",
        value: true,
      },
      description: "no",
    },
    {
      id: "14344E97-7CC3-4687-E10F-08DB022F8B8F",
      leftTitle: "Geography",
      mainTitle: "50 Lei",
      typeSubtitle: 
      {
        key: "Online",
        value: true,
      },
      description: "geo",
    },
    {
      id: "161208B-DAFC-4597-A473-8D8719F82185",
      leftTitle: "Romanian",
      mainTitle: "100 Lei",
      typeSubtitle: 
      {
        key: "Online",
        value: true,
      },
      description: "desc",
    }
   ];
   component.cardsListModel = cardList;
   const announcementId = component.cardsListModel[0].id;
   
   mockAnnouncementService.DeleteAnnouncement.and.returnValue(of(true));
   component.delete(announcementId);
   tick();
   expect(component.announcements.length).toBe(3);
   expect(component.cardsListModel.length).toBe(3);
  }));

});