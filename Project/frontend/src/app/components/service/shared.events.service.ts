import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {Ticket} from '../model/ticket';

@Injectable()
export class SharedEventsService {
  private onTicketCreateObservable: Subject<string> = new Subject<string>();
  private onProjectCreateObservable: Subject<void> = new Subject<void>();
  private onTicketEditObservable: Subject<Ticket> = new Subject<Ticket>();
  private onTicketAssignObservable: Subject<Ticket> = new Subject<Ticket>();
  private onTicketLogWorkObservable: Subject<Ticket> = new Subject<Ticket>();

  private onTicketCreateObservable$: Observable<string> = this.onTicketCreateObservable.asObservable();
  private onProjectCreateObservable$: Observable<void> = this.onProjectCreateObservable.asObservable();
  private onTicketEditObservable$: Observable<Ticket> = this.onTicketEditObservable.asObservable();
  private onTicketAssignObservable$: Observable<Ticket> = this.onTicketAssignObservable.asObservable();
  private onTicketLogWorkObservable$: Observable<Ticket> = this.onTicketLogWorkObservable.asObservable();

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

  public _setOnTicketEdit(ticket: Ticket) {
    this.onTicketEditObservable.next(ticket);
  }

  public _getOnTicketEdit(): Observable<Ticket> {
    return this.onTicketEditObservable$;
  }

  public _setOnTicketAssign(ticket: Ticket) {
    this.onTicketAssignObservable.next(ticket);
  }

  public _getOnTicketAssign(): Observable<Ticket> {
    return this.onTicketAssignObservable$;
  }

  public _setOnTicketLogWork(ticket: Ticket) {
    this.onTicketLogWorkObservable.next(ticket);
  }

  public _getOnTicketLogWork(): Observable<Ticket> {
    return this.onTicketLogWorkObservable$;
  }
}
