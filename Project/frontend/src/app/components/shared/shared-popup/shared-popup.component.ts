import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'e2m-shared-popup',
  templateUrl: './shared-popup.component.html',
  styleUrls: ['../../../../assets/styles/shared/shared-popup/shared-popup.component.less']
})
export class SharedPopupComponent implements OnInit {

  @Input()
  public header: string;
  @Input()
  public closeable: boolean;

  @Output()
  public onClose: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public onSubmit: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
  }

  public _onClose(): void {
    this.onClose.emit();
  }

  public _onSubmit(): void {
    this.onSubmit.emit();
  }

}
