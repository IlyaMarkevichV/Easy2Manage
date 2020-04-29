import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'e2m-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['../../../../assets/styles/shared/notifications/notifications.component.less']
})
export class NotificationsComponent implements OnInit {

  @Input()
  public text: string;
  @Input()
  public closeable: boolean = true;
  @Output()
  public onClose: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

  public _onClose(): void {
    this.onClose.emit();
  }

}
