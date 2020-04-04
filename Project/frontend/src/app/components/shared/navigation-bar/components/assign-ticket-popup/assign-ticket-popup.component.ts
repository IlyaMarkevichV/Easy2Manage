import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {User} from '../../../../model/user';
import {Ticket} from '../../../../model/ticket';
import {UserService} from '../../../../service/user.service';

export enum ControlFields {
  assigneeId = 'assigneeId',
}

@Component({
  selector: 'e2m-assign-ticket-popup',
  templateUrl: './assign-ticket-popup.component.html',
  styleUrls: ['../../../../../../assets/styles/shared/navigation-bar/components/assign-ticket-popup.component.less']
})
export class AssignTicketPopupComponent implements OnInit {

  @Input()
  public visible: boolean;

  public users: User[];

  @Output()
  public onSubmit: EventEmitter<Ticket> = new EventEmitter<Ticket>();

  @Output()
  public onClose: EventEmitter<Ticket> = new EventEmitter<Ticket>();

  public formGroup: FormGroup;
  public controlFieldsEnum = ControlFields;

  @Input()
  public ticket: Ticket;

  public unsubscribeStream: Subject<void> = new Subject<void>();

  constructor(private userService: UserService) { }

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
    if (this.users == null) {
      this.userService.getUsers().subscribe(data => {
        this.users = data;
        this.ticket[key] = this.users.find(user => user.username == value).id;
      })
    } else {
      this.ticket[key] = this.users.find(user => user.username == value).id;
    }
  }
}
