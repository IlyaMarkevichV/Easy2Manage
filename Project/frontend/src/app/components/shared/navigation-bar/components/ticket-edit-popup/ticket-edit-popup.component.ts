import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {User} from '../../../../model/user';
import {Ticket} from '../../../../model/ticket';
import {UserService} from '../../../../service/user.service';

export enum ControlFields {
  name = 'name',
  description = 'description',
  type = 'type',
  priority = 'priority',
  status = 'status',
  assigneeId = 'assigneeId',
  dueDate = 'dueDate',
  estimated = 'estimated',
  remaining = 'remaining',
  logged = 'logged'
}

@Component({
  selector: 'e2m-ticket-edit-popup',
  templateUrl: './ticket-edit-popup.component.html',
  styleUrls: ['../../../../../../assets/styles/shared/navigation-bar/components/ticket-edit-popup.component.less']
})
export class TicketEditPopupComponent implements OnInit {

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

  public types: Set<string> = new Set<string>(['story', 'dev task', 'defect']);
  public priorities: Set<string> = new Set<string>(['low', 'normal', 'major', 'critical', 'blocker']);
  public statuses: Set<string> = new Set<string>(['open', 'in build', 'in design', 'in analysis', 'ready for design', 'on hold', 'ready for testing', 'reopened', 'closed', 'in qa', 'ready for build', 'qa done', 'implement']);

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
    // this.userService.getUsers().subscribe(data => {
    //   this.users = data;
    // });
      Object.keys(this.controlFieldsEnum).forEach((key: string) => {
        const formControl: FormControl = new FormControl(null, Validators.required);
        formControl.valueChanges.pipe(takeUntil(this.unsubscribeStream)).subscribe(value => this.onValueChange(key, value));
        // if (key === this.controlFieldsEnum.assigneeId) {
        //   formControl.setValue(this.ticket[key]);
        // } else {
          formControl.setValue(this.ticket[key]);
        // }
        this.formGroup.addControl(key, formControl);
      });
    // });
  }

  private onValueChange(key: string, value: any) {
    if (key === this.controlFieldsEnum.assigneeId) {
      if (this.users == null) {
        this.userService.getUsers().subscribe(data => {
          this.users = data;
          this.ticket[key] = this.users.find(user => user.username == value).id;
        })
      } else {
        this.ticket[key] = this.users.find(user => user.username == value).id;
      }
    } else {
      this.ticket[key] = value;
    }
  }
}
