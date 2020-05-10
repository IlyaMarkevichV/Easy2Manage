import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../service/project.service';
import {Project} from '../../model/project';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {NotificationsService} from '../../service/notifications.service';

@Component({
  selector: 'e2m-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['../../../../assets/styles/pages/projects/projects.component.less']
})
export class ProjectsComponent implements OnInit {

  public contentReady: boolean = false;
  public projects: Project[];
  public file: File;

  constructor(private service: ProjectService,
              private router: Router,
              private spinnerService: NgxSpinnerService,
              private notificationsService: NotificationsService) {
  }

  ngOnInit() {
    this.spinnerService.show();
    this.service.getProjects(1, 5).subscribe(data => {
      if (data) {
        this.projects = data;
        this.contentReady = true;
        this.spinnerService.hide();
      }
    }, () => {
      this.spinnerService.hide();
      this.notificationsService._setOnOpenNotification("Service unavailable");
    });
  }

  public drop(event: CdkDragDrop<Project[]>): void {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  public moveToTickets(projectId: string): void {
    this.router.navigate(['project'], {
      queryParams: {
        id: projectId
      }
    });
  }

}
