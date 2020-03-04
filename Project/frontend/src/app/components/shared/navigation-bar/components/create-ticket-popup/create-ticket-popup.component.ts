import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from "../../../../model/project";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {Ticket} from "../../../../model/ticket";

export enum ControlFields {
  name = 'name',
  description = 'description',
  type = 'type',
  priority = 'priority',
  projectId = 'projectId',
  dueDate = 'dueDate',
  estimated = 'estimated',
}

@Component({
  selector: 'e2m-create-ticket-popup',
  templateUrl: './create-ticket-popup.component.html',
  styleUrls: ['../../../../../../assets/styles/shared/navigation-bar/components/create-ticket-popup.component.less']
})
export class CreateTicketPopupComponent implements OnInit {

  @Input()
  public visible: boolean;
  @Input()
  public projectsArray: Project[];
  @Input()
  public selectedProject: Project;

  @Output()
  public onSubmit: EventEmitter<Ticket> = new EventEmitter<Ticket>();

  @Output()
  public onClose: EventEmitter<Ticket> = new EventEmitter<Ticket>();

  public ticket: Ticket = new Ticket();

  public formGroup: FormGroup;
  public controlFieldsEnum = ControlFields;

  public unsubscribeStream: Subject<void> = new Subject<void>();

  public types: Set<string> = new Set<string>(['story', 'dev task', 'defect']);
  public priorities: Set<string> = new Set<string>(['low', 'normal', 'major', 'critical', 'blocker']);


  constructor() {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({});
    this.initFormGroup();
  }

  public _onSubmit(): void {
    this.ticket.status = "open";
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
      this.formGroup.addControl(key, formControl);
    });
  }

  private onValueChange(key: string, value: any) {
    if (key === this.controlFieldsEnum.projectId) {
      this.ticket[key] = this.projectsArray.find(project => project.name == value).id;
    } else {
      this.ticket[key] = value;
    }
  }

}
