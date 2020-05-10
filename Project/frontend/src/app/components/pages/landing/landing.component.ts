import {Component, OnInit} from '@angular/core';
import {SharedEventsService} from '../../service/shared.events.service';
import {ProjectService} from '../../service/project.service';
import {timer} from 'rxjs';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';
import {map, take} from 'rxjs/operators';

@Component({
  selector: 'e2m-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['../../../../assets/styles/pages/landing/landing.component.less']
})
export class LandingComponent implements OnInit {

  public numberOfProjects: number = 0;
  public numberOfUsers: number = 0;

  constructor(private shareEvents: SharedEventsService,
              private projectService: ProjectService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.projectService.getTotalNumberOfProjects().subscribe((data: number) => this.startProjectsCounter(data));
    this.userService.getUsers().subscribe((users: User[]) => this.startUsersCounter(users.length));
  }

  public createProject() {
    this.shareEvents._setOnProjectCreate();
  }

  public startProjectsCounter(limit: number): void {
    timer(0, 1).pipe(
      take(limit),
      map(() => ++this.numberOfProjects)
    ).subscribe();
  }

  public startUsersCounter(limit: number): void {
    timer(0, 1).pipe(
      take(limit),
      map(() => ++this.numberOfUsers)
    ).subscribe();
  }

}
