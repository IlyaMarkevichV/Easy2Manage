import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {Observable} from "rxjs";
import {Ticket} from "../model/ticket";

@Injectable({
  providedIn: "root"
})
export class TicketService {

  constructor(private http: HttpClient) {}

  getTickets(projectId: number, page: number, size: number): Observable<User[]> {
    return this.http.get<User[]>("api/ticket?projectId=" + projectId + "&limit=" + size + "&offset=" + page);
  }

  // getTotalPages(size: number): Observable<number> {
  //   return this.http.get<number>("api/ticket/total_pages?size=" + size);
  // }

  saveTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>("api/ticket", ticket);
  }

  getTicket(ticketId: string): Observable<Ticket> {
    return this.http.get<Ticket>("api/ticket/" + ticketId);
  }

}
