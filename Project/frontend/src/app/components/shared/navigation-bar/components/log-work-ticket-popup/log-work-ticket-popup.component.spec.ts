import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogWorkTicketPopupComponent } from './log-work-ticket-popup.component';

describe('LogWorkTicketPopupComponent', () => {
  let component: LogWorkTicketPopupComponent;
  let fixture: ComponentFixture<LogWorkTicketPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogWorkTicketPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogWorkTicketPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
