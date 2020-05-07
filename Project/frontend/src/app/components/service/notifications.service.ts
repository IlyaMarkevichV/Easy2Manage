import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Ticket} from '../model/ticket';
import {User} from '../model/user';

@Injectable()
export class NotificationsService {
  private onOpenNotificationObservable: Subject<string> = new Subject<string>();

  private onOpenNotificationObservable$: Observable<string> = this.onOpenNotificationObservable.asObservable();

  constructor() {
  }

  public _setOnOpenNotification(text: string) {
    this.onOpenNotificationObservable.next(text);
  }

  public _getOnOpenNotification(): Observable<string> {
    return this.onOpenNotificationObservable$;
  }
}
