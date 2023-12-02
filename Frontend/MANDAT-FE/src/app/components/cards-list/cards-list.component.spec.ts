import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardsListComponent } from './cards-list.component';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('CardsListComponent', () => {
  let component: CardsListComponent;
  let fixture: ComponentFixture<CardsListComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsListComponent ],
      imports: [RouterTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit delete event', () => {
    const deleteSpy = spyOn(component.deleteEmitter, 'emit');
    const cardAnnouncementId = '983B8363-55DC-4EDF-2D6E-08DB00C4CF1E';
    component.delete(cardAnnouncementId);
    expect(deleteSpy).toHaveBeenCalledWith(cardAnnouncementId);
  });

  it('should delete event', () => {
    let cards=[
      {
        id: "983B8363-55DC-4EDF-2D6E-08DB00C4CF1E",
            leftTitle: "History",
            mainTitle: "3 Lei",
            typeSubtitle: {
              key: "Online",
              value: true,
            },
            description: "no",
      },
      {
        id: "14344E97-7CC3-4687-E10F-08DB022F8B8F",
            leftTitle: "Geography",
            mainTitle: "50 Lei",
            typeSubtitle: {
              key: "Online",
              value: true,
            },
            description: "geo",
      },
      {
        id: "2161208B-DAFC-4597-A473-8D8719F82185",
        leftTitle: "Romanian",
        mainTitle: "100 Lei",
        typeSubtitle: {
          key: "Online",
          value: true,
        },
        description: "desc",
      }
    ]
    component.models=cards;
    const deleteSpy = spyOn(component.deleteEmitter, 'emit');
    const cardAnnouncementId = component.models[0].id;
    component.delete(cardAnnouncementId);
    expect(deleteSpy).toHaveBeenCalledWith(cardAnnouncementId);
    expect(component.models.length).toBe(2);

    expect(component.models).toEqual([
      {
        id: "14344E97-7CC3-4687-E10F-08DB022F8B8F",
            leftTitle: "Geography",
            mainTitle: "50 Lei",
            typeSubtitle: {
              key: "Online",
              value: true,
            },
            description: "geo",
      },
      {
        id: "2161208B-DAFC-4597-A473-8D8719F82185",
        leftTitle: "Romanian",
        mainTitle: "100 Lei",
        typeSubtitle: {
          key: "Online",
          value: true,
        },
        description: "desc",
      }
    ])
  });
});

