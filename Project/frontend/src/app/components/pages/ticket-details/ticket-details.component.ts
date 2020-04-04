import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TicketService} from '../../service/ticket.service';
import {Ticket} from '../../model/ticket';
import {SharedEventsService} from '../../service/shared.events.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['../../../../assets/styles/pages/ticket-details/ticket-details.component.less']
})
export class TicketDetailsComponent implements OnInit {

  public editTicketPopupVisible: boolean = false;
  public assignPopupVisible: boolean = false;
  public logWorkPopupVisible: boolean = false;

  public ticket: Ticket;
  public load: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private ticketService: TicketService,
              private sharedService: SharedEventsService) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.ticketService.getTicket(params.get('id')).subscribe(data => {
        this.ticket = data;
        this.load = true;
      })
    })
  }

  public editTicket(event: any) {
    this.sharedService._setOnTicketEdit(this.ticket);
  }

  public assignTicket(event: any) {
    this.sharedService._setOnTicketAssign(this.ticket);
  }

  public logWork(event: any) {
    this.sharedService._setOnTicketLogWork(this.ticket);
  }

  // public closeEditTicketPopup(): void {
  //   this.editTicketPopupVisible = false;
  // }

  // public modifyTicket(newTicket: Ticket): void {
  //   this.ticketService.updateTicket(newTicket).subscribe(() => {
  //     this.closeEditTicketPopup();
  //     window.location.reload();
  //   });
  // }

  public navigateToProject(projectId: string) {
    this.router.navigate(['project'], {
      queryParams: {
        id: projectId
      }
    });
  }
}
