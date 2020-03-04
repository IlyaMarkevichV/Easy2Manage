import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../service/project.service";
import {Project} from "../../model/project";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {LogicalFileSystem, NodeJSFileSystem} from "@angular/compiler-cli/src/ngtsc/file_system";
import {Router} from "@angular/router";

@Component({
  selector: 'e2m-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['../../../../assets/styles/pages/project-info/project-info.component.less']
})
export class ProjectInfoComponent implements OnInit {

  public projects: Project[];
  public file: File;

  constructor(private service: ProjectService,
              private router: Router) {
  }

  ngOnInit() {
    this.service.getProjects(1, 5).subscribe(data => {
      if (data) {
        this.projects = data;
      }
    });
  }

  public drop(event: CdkDragDrop<Project[]>): void {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  public moveToTickets(projectId: string): void {
    this.router.navigate(['tickets'], {
      queryParams: {
        id: projectId
      }
    });
  }

}
