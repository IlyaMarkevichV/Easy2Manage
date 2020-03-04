import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable()
export class SharedEventsService {
  private onTicketCreateObservable: Subject<string> = new Subject<string>();
  private onProjectCreateObservable: Subject<void> = new Subject<void>();

  private onTicketCreateObservable$: Observable<string> = this.onTicketCreateObservable.asObservable();
  private onProjectCreateObservable$: Observable<void> = this.onProjectCreateObservable.asObservable();

  constructor() {
  }

  public _setOnTicketCreate(projectId: string) {
    this.onTicketCreateObservable.next(projectId);
  }

  public _getOnTicketCreate(): Observable<string> {
    return this.onTicketCreateObservable$;
  }

  public _setOnProjectCreate(projectId?: string) {
    this.onProjectCreateObservable.next();
  }

  public _getOnProjectCreate(): Observable<void> {
    return this.onProjectCreateObservable$;
  }

}
