import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Project} from '../../model/project';
import {ProjectService} from '../../service/project.service';
import {Ticket} from '../../model/ticket';
import {TicketService} from '../../service/ticket.service';
import {SharedEventsService} from '../../service/shared.events.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'e2m-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['../../../../assets/styles/pages/project-details/project-details.component.less']
})
export class ProjectDetailsComponent implements OnInit {

  public project: Project;
  public tickets: Ticket[];
  public contentReady: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private serviceProj: ProjectService,
              private serviceTickets: TicketService,
              private sharedEvents: SharedEventsService,
              private spinnerService: NgxSpinnerService) {
  }

  ngOnInit() {
    this.spinnerService.show();
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.serviceProj.getProject(params.get('id')).subscribe(data => {
        this.project = data;
        this.serviceTickets.getTickets(data.id, 1, 5).subscribe(data => {
            this.tickets = data;
            this.contentReady = true;
            this.spinnerService.hide();
          },
          (error: any) => {
            this.contentReady = true;
            this.spinnerService.hide();
          });
      }, (error: any) => {
        this.contentReady = true;
        this.spinnerService.hide();
      });
    });
  }

  public addTicket(event: any) {
    this.sharedEvents._setOnTicketCreate(this.project.id);
  }

  public navigateToTicket(ticketId: string) {
    this.router.navigate(['ticket'], {
      queryParams: {
        id: ticketId
      }
    });
  }
}
