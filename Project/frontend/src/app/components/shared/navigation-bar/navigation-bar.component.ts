import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Project} from '../../model/project';
import {ProjectService} from '../../service/project.service';
import {SharedEventsService} from '../../service/shared.events.service';
import {Ticket} from '../../model/ticket';
import {TicketService} from '../../service/ticket.service';
import {User} from '../../model/user';
import {TokenProvider} from '../../http/token.provider';
import {NotificationsService} from '../../service/notifications.service';

@Component({
  selector: 'e2m-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['../../../../assets/styles/shared/navigation-bar/navigation-bar.component.less']
})
export class NavigationBarComponent implements OnInit {

  public createProjectPopupVisible: boolean = false;
  public createTicketPopupVisible: boolean = false;
  public editTicketPopupVisible: boolean = false;
  public assignPopupVisible: boolean = false;
  public logWorkPopupVisible: boolean = false;
  public logInPopupVisible: boolean = false;
  public userAuthorized: boolean = false;
  public showNotification: boolean = false;

  public user: User;
  public selectedProject: Project;
  public ticket: Ticket;
  public projects: Project[];
  public notificationText: string;

  constructor(private router: Router,
              private service: ProjectService,
              private ticketService: TicketService,
              private sharedEvents: SharedEventsService,
              private notificationsService: NotificationsService,
              private tokenProvider: TokenProvider) {
  }

  ngOnInit() {
    this.initSubscriptions();
  }

  public openCreateProjectPopup(event?: any): void {
    this.createProjectPopupVisible = true;
  }

  public openEditTicketPopup(event?: any): void {
    this.editTicketPopupVisible = true;
  }

  public openAssignTicketPopup(event?: any): void {
    this.assignPopupVisible = true;
  }

  public openLogWorkTicketPopup(event?: any): void {
    this.logWorkPopupVisible = true;
  }

  public closeCreateProjectPopup(): void {
    this.createProjectPopupVisible = false;
  }

  public openCreateTicketPopup(event?: any): void {
    this.getAllProjects();
  }

  public closeCreateTicketPopup(): void {
    this.createTicketPopupVisible = false;
    this.selectedProject = null;
  }

  public openLogInPopup(): void {
    this.logInPopupVisible = true;
  }

  public closeLogInPopup(): void {
    this.logInPopupVisible = false;
  }

  public openNotification(text: string): void {
    this.notificationText = text;
    this.showNotification = true;
    setTimeout(()=>{
      this.closeNotification();
    }, 3000);
  }

  public closeNotification(): void {
    this.showNotification = false;
    this.notificationText = null;
  }

  public navigateToProjects(): void {
    this.router.navigate(['projects']);
  }

  public navigateToLanding(): void {
    this.router.navigate(['']);
  }

  private getAllProjects() {
    this.service.getProjects(1, 1234).subscribe((data: Project[]) => {
      if (data) {
        this.projects = data;
        this.createTicketPopupVisible = true;
      }
    });
  }

  public createProject(newProject: Project): void {
    this.service.saveProject(newProject).subscribe((project: Project) => {
        if (project) {
          this.closeCreateProjectPopup();
          this.router.navigate(['project'], {
            queryParams: {
              id: project.id
            }
          });
        }
      },
      () => {
        this.closeCreateProjectPopup();
      });
  }

  public createTicket(newTicket: Ticket): void {
    this.ticketService.saveTicket(newTicket).subscribe((ticket: Ticket) => {
      this.closeCreateTicketPopup();
      if (window.location.href.includes('tickets')) {
        window.location.reload();
      } else {
        this.router.navigate(['ticket'], {
          queryParams: {
            id: ticket.id
          }
        })
      }
    });
  }

  private initSubscriptions(): void {
    this.sharedEvents._getOnTicketCreate().subscribe((projectId: string) => {
      this.service.getProject(projectId).subscribe((project: Project) => {
        this.openCreateTicketPopup();
      });
    });

    this.sharedEvents._getOnProjectCreate().subscribe(() => {
      this.openCreateProjectPopup();
    });

    this.sharedEvents._getOnTicketEdit().subscribe(ticket => {
      this.ticket = ticket;
      this.openEditTicketPopup();
    });

    this.sharedEvents._getOnTicketAssign().subscribe(ticket => {
      this.ticket = ticket;
      this.openAssignTicketPopup();
    });

    this.sharedEvents._getOnTicketLogWork().subscribe(ticket => {
      this.ticket = ticket;
      this.openLogWorkTicketPopup();
    });

    this.sharedEvents._getOnUserSignIn().subscribe((user: User) => {
      this.proceedAuthorization(user);
    });

    this.notificationsService._getOnOpenNotification().subscribe((text: string) => {
      this.openNotification(text);
    });
  }

  public closeEditTicketPopup(): void {
    this.editTicketPopupVisible = false;
  }

  public modifyTicket(newTicket: Ticket): void {
    this.ticketService.updateTicket(newTicket).subscribe(ticket => {
      // this.ticket = ticket;
      this.closeEditTicketPopup();
      window.location.reload();
    });
  }

  public proceedAuthorization(user: User): void {
    this.user = user;
    this.userAuthorized = true;
    this.logInPopupVisible = false;
  }

  public proceedLogOut(): void {
    this.tokenProvider.removeToken();
    this.userAuthorized = false;
    this.user = null;
  }

  public navigateToRegistration(): void {
    this.router.navigate(['registration']);
  }

  public navigateToDashboards(): void {
    if (!this.user) {
      this.openNotification("Log In please");
    } else {
      this.router.navigate(['dashboards'], {
        queryParams: {
          userId: this.user.id
        }
      });
    }
  }
}
