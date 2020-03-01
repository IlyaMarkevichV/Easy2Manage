import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../../service/project.service";
import {Project} from "../../model/project";

@Component({
  selector: 'e2m-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['../../../../assets/styles/pages/project-info/project-info.component.less']
})
export class ProjectInfoComponent implements OnInit {

  public projects: Project[];

  constructor(private service: ProjectService) { }

  ngOnInit() {
    this.service.getProjects(1, 5).subscribe(data => {
      if (data) {
        this.projects = data;
      }
    });
  }

}
