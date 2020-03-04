import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../model/user";
import {Observable} from "rxjs";
import {Ticket} from "../model/ticket";

@Injectable({
  providedIn: "root"
})
export class TicketService {

  constructor(private http: HttpClient) {}

  getTickets(projectId: string, offset: number, limit: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>("api/ticket?projectId=" + projectId + "&limit=" + limit + "&offset=" + offset);
  }

  saveTicket(ticket: Ticket): Observable<Ticket> {
    const json = JSON.stringify(ticket);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};
    return this.http.post<Ticket>("api/ticket/create", json, options);
  }

  getTicket(ticketId: string): Observable<Ticket> {
    return this.http.get<Ticket>("api/ticket/" + ticketId);
  }

}
