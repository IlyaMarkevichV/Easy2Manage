import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Project} from "../../model/project";
import {ProjectService} from "../../service/project.service";
import {SharedEventsService} from "../../service/shared.events.service";

@Component({
  selector: 'e2m-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['../../../../assets/styles/shared/navigation-bar/navigation-bar.component.less']
})
export class NavigationBarComponent implements OnInit {


  public createProjectPopupVisible: boolean = false;
  public createTicketPopupVisible: boolean = false;

  public selectedProject: Project;

  constructor(private router: Router,
              private service: ProjectService,
              private sharedEvents: SharedEventsService) {
  }

  ngOnInit() {
    this.initSubscriptions();
  }

  public openCreateProjectPopup(event?: any): void {
    this.createProjectPopupVisible = true;
  }

  public closeCreateProjectPopup(): void {
    this.createProjectPopupVisible = false;
  }

  public openCreateTicketPopup(event: any): void {
    this.createTicketPopupVisible = true;
  }

  public closeCreateTicketPopup(): void {
    this.createTicketPopupVisible = false;
    this.selectedProject = null;
  }

  public navigateToProjects(): void {
    this.router.navigate(['projects']);
  }

  public navigateToLanding(): void {
    this.router.navigate(['']);
  }

  public createProject(event: Project): void {
    this.service.saveProject(event).subscribe((project: Project) => {
        if (project) {
          this.closeCreateProjectPopup();
          this.router.navigate(['tickets'], {
            queryParams: {
              id: project.id
            }
          })
        }
      },
      () => {
        this.closeCreateProjectPopup();
      });
  }

  private initSubscriptions(): void {
    this.sharedEvents._getOnTicketCreate().subscribe((projectId: string) => {
      this.service.getProject(projectId).subscribe((project: Project) => {
        this.selectedProject = project;
        this.createTicketPopupVisible = true;
      });
    });

    this.sharedEvents._getOnProjectCreate().subscribe(() => {
      this.openCreateProjectPopup();
    })
  }

}
