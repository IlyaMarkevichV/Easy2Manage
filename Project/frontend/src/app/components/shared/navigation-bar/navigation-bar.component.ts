import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Project} from "../../model/project";
import {ProjectService} from "../../service/project.service";

@Component({
  selector: 'e2m-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['../../../../assets/styles/shared/navigation-bar/navigation-bar.component.less']
})
export class NavigationBarComponent implements OnInit {


  public createProjectPopupVisible: boolean = false;
  public createTicketPopupVisible: boolean = false;

  constructor(private router: Router,
              private service: ProjectService) {
  }

  ngOnInit() {
  }

  public openCreateProjectPopup(event: any): void {
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
  }

  public navigateToProjects(): void {
    this.router.navigate(['projects']);
  }

  public navigateToLanding(): void {
    this.router.navigate(['']);
  }

  public createProject(event: Project): void {
    this.service.saveProject(event).subscribe();
  }

}
