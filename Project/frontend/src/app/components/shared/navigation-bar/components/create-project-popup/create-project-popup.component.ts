import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from "../../../../model/project";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

export enum ControlFields {
  name = 'name',
  description = 'description'
}

@Component({
  selector: 'e2m-create-project-popup',
  templateUrl: './create-project-popup.component.html',
  styleUrls: ['../../../../../../assets/styles/shared/navigation-bar/components/create-project-popup.component.less']
})
export class CreateProjectPopupComponent implements OnInit {

  @Input()
  public visible: boolean;

  @Output()
  public onSubmit: EventEmitter<Project> = new EventEmitter<Project>();

  @Output()
  public onClose: EventEmitter<Project> = new EventEmitter<Project>();

  public formGroup: FormGroup;
  public controlFieldsEnum = ControlFields;
  public project: Project = new Project();

  public unsubscribeStream: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit() {
    this.formGroup = new FormGroup({});
    this.initFormGroup();
  }

  public _onSubmit() {
    this.onSubmit.emit(this.project);
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
    this.project[key] = value;
  }

}
