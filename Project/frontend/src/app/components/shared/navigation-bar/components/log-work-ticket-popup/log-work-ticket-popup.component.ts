import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ticket} from '../../../../model/ticket';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

export enum ControlFields {
  logged = 'logged'
}

@Component({
  selector: 'e2e-log-work-ticket-popup',
  templateUrl: './log-work-ticket-popup.component.html',
  styleUrls: ['../../../../../../assets/styles/shared/navigation-bar/components/log-work-ticket-popup.component.less']
})
export class LogWorkTicketPopupComponent implements OnInit {

  @Input()
  public visible: boolean;

  @Output()
  public onSubmit: EventEmitter<Ticket> = new EventEmitter<Ticket>();

  @Output()
  public onClose: EventEmitter<Ticket> = new EventEmitter<Ticket>();

  public formGroup: FormGroup;
  public controlFieldsEnum = ControlFields;

  @Input()
  public ticket: Ticket;

  public unsubscribeStream: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit() {
    this.formGroup = new FormGroup({});
    this.initFormGroup();
  }

  public _onSubmit(): void {
    this.onSubmit.emit(this.ticket);
  }

  public _onClose(): void {
    this.onClose.emit();
    this.visible = false;
  }

  private initFormGroup(): void {
    Object.keys(this.controlFieldsEnum).forEach((key: string) => {
      const formControl: FormControl = new FormControl(null, Validators.required);
      formControl.valueChanges.pipe(takeUntil(this.unsubscribeStream)).subscribe(value => this.onValueChange(key, value));
      formControl.setValue(this.ticket[key]);
      this.formGroup.addControl(key, formControl);
    });
  }

  private onValueChange(key: string, value: any) {
      this.ticket[key] = value;
      this.ticket.remaining = this.ticket.estimated - value;
  }}
