import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketEditPopupComponent } from './ticket-edit-popup.component';

describe('TicketEditPopupComponent', () => {
  let component: TicketEditPopupComponent;
  let fixture: ComponentFixture<TicketEditPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketEditPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
