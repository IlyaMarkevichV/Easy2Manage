import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTicketPopupComponent } from './assign-ticket-popup.component';

describe('AssignTicketPopupComponent', () => {
  let component: AssignTicketPopupComponent;
  let fixture: ComponentFixture<AssignTicketPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignTicketPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTicketPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
