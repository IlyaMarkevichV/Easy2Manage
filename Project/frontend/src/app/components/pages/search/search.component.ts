import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {PriorityEnum} from '../../enum/priority.enum';
import {StatusEnum} from '../../enum/status.enum';
import {TypeEnum} from '../../enum/type.enum';
import {FilterValue} from '../../model/filter-value';
import {Ticket} from '../../model/ticket';
import {ActivatedRoute, Router} from '@angular/router';
import {FilterService} from '../../service/filter.service';
import {FilterParam} from '../../model/filterParam';
import {NgxSpinnerService} from 'ngx-spinner';
import {ProjectService} from '../../service/project.service';
import {UserService} from '../../service/user.service';
import {forkJoin} from 'rxjs';
import {DashboardService} from '../../service/dashboard.service';
import {Dashboard} from '../../model/dashboard';
import {Project} from '../../model/project';
import {User} from '../../model/user';

export enum FiltersEnum {
  Project = 'Project',
  Status = 'Status',
  Type = 'Type',
  Priority = 'Priority',
  Assignee = 'Assignee',
  Reporter = 'Reporter'
}

@Component({
  selector: 'e2m-search',
  templateUrl: './search.component.html',
  styleUrls: ['../../../../assets/styles/pages/search/search.component.less']
})
export class SearchComponent implements OnInit, OnDestroy {

  public priorities: any = PriorityEnum;
  public statuses: any = StatusEnum;
  public types: any = TypeEnum;
  public filtersEnum: any = FiltersEnum;

  public filtersReady: boolean = false;
  public contentReady: boolean = true;
  public dashboardNamePopupVisible: boolean = false;
  public dashboardId: string;
  public userId: string = '1';
  public dashboardName: string = "Dashboard";
  public projects: Project[] = [];
  public users: User[] = [];

  public tickets: Ticket[] = [];

  public filters: Map<string, FilterValue[]> = new Map<string, FilterValue[]>();

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private filterService: FilterService,
              private projectService: ProjectService,
              private userService: UserService,
              private dashBoardService: DashboardService,
              private spinnerService: NgxSpinnerService) {
  }

  ngOnInit() {
    this.spinnerService.show();
    this.activatedRoute.queryParamMap.subscribe((params: any) => {
      this.userId = params.get('userId');
    });
    this.initFilters();
    this.initDashboard();
  }

  public initFilters(): void {
    Object.keys(this.filtersEnum).forEach((key: string) => {
      let values: FilterValue[] = [];
      if (key === 'Status') {
        Object.values(this.statuses).forEach((key: string) => {
          values.push({name: key, selected: false});
        });
      } else if (key == 'Priority') {
        Object.values(this.priorities).forEach((key: string) => {
          values.push({name: key, selected: false});
        });
      } else if (key == 'Type') {
        Object.values(this.types).forEach((key: string) => {
          values.push({name: key, selected: false});
        });
      }
      this.filters.set(key, values);
    });
    let projects = this.projectService.getProjects(1,20);
    let users = this.userService.getUsers();

    forkJoin([projects, users]).subscribe( result => {
      let projects: FilterValue[] = [];
      result[0].forEach(key => projects.push({name: key.name, selected: false}));
      this.projects = result[0];
      this.filters.set(FiltersEnum.Project, projects);
      let users: FilterValue[] = [];
      result[1].forEach(key => users.push({name: key.username, selected: false}));
      this.users = result[1];
      this.filters.set(FiltersEnum.Assignee, users);
      this.filters.set(FiltersEnum.Reporter, users);
      this.filtersReady = true;
    })
  }

  public setFilterValue(event: any, filterName: string, filterValue: FilterValue): void {
    event.stopPropagation();
    this.filters.get(filterName)
      .find((filter: FilterValue) => filter.name === filterValue.name)
      .selected = !filterValue.selected;
  }

  public getKeys(): Iterable<string> {
    return this.filters.keys();
  }

  public getValues(key: string): FilterValue[] {
    return this.filters.get(key);
  }

  public applyFilters(): void {
    this.modifyFilter();
  }

  public async saveFilters(): Promise<void> {
    this.dashBoardService.createDashboard(SearchComponent.createDashboard(this.dashboardName, this.userId)).subscribe(dashboard => {
      this.filterService.createFilter(dashboard.id, dashboard.name).subscribe(() => {
        this.addParams(dashboard.id);
        setTimeout(() => {
          this.navigateToDashboards();
        }, 3000);
      })
    })
  }

  public navigateToTicket(ticketId: string): void {
    this.router.navigate(['ticket'], {
      queryParams: {
        id: ticketId
      }
    });
  }

  public navigateToDashboards(): void {
    this.dashBoardService.deleteDashboard(this.dashboardId).subscribe(() => {
      this.router.navigate(['dashboards'], {
        queryParams: {
          userId: this.userId
        }
      });
    });
  }

  public setDashboardPopupVisible(): void {
    this.dashboardNamePopupVisible = !this.dashboardNamePopupVisible;
  }

  modifyFilter(): void {
    this.spinnerService.show();
    this.filterService.deleteFilter(this.dashboardId).subscribe(() => {
      this.filterService.createFilter(this.dashboardId, "Filter").subscribe(() => {
        this.addParams(this.dashboardId);
      })
    })
  }

  public addParams(dashboardId: string): void {
    let param = this.createParam(dashboardId, 'project_id');
    this.filters.get(FiltersEnum.Project).filter(value => value.selected).forEach(value => {
      this.projects.forEach(project => {
        if (project.name == value.name) {
          param.paramValues.push(project.id);
        }
      });
    });
    this.filterService.addParam(param).subscribe(() => {
      let param = this.createParam(dashboardId, 'status');
      this.filters.get(FiltersEnum.Status).filter(value => value.selected).forEach(value =>
        param.paramValues.push(SearchComponent.convertToDbValues(value.name)));
      this.filterService.addParam(param).subscribe(() => {
        let param = this.createParam(dashboardId, 'type');
        this.filters.get(FiltersEnum.Type).filter(value => value.selected).forEach(value =>
          param.paramValues.push(SearchComponent.convertToDbValues(value.name)));
        this.filterService.addParam(param).subscribe(() => {
          let param = this.createParam(dashboardId, 'priority');
          this.filters.get(FiltersEnum.Priority).filter(value => value.selected).forEach(value =>
            param.paramValues.push(SearchComponent.convertToDbValues(value.name)));
          this.filterService.addParam(param).subscribe(() => {
            let param = this.createParam(dashboardId, 'assignee_id');
            this.filters.get(FiltersEnum.Assignee).filter(value => value.selected).forEach(value => {
              this.users.forEach(user => {
                if (user.username == value.name) {
                  param.paramValues.push(user.id);
                }
              });
            });
            this.filterService.addParam(param).subscribe(() => {
              let param = this.createParam(dashboardId, 'reporter_id');
              this.filters.get(FiltersEnum.Reporter).filter(value => value.selected).forEach(value => {
                this.users.forEach(user => {
                  if (user.username == value.name) {
                    param.paramValues.push(user.id);
                  }
                });
              });
              this.filterService.addParam(param).subscribe(() => {
                this.dashBoardService.getDashboard(this.dashboardId).subscribe(dashboard => {
                  this.tickets = dashboard.tickets;
                  this.spinnerService.hide();
                });
              });
            });
          });
        });
      });
    });
  }

  public initDashboard(): void {
    this.dashBoardService.createDashboard(SearchComponent.createDashboard("Filter", this.userId)).subscribe(dashboard => {
      this.dashboardId = dashboard.id;
      this.filterService.createFilter(this.dashboardId, "Filter").subscribe(() => {
        this.dashBoardService.getDashboard(this.dashboardId).subscribe(dashboard => {
          this.tickets = dashboard.tickets;
          this.spinnerService.hide();
        })
      })
    })
  }

  public createParam(dashboardId: string, paramName: string): FilterParam {
    let param = new FilterParam();
    param.modifier = "CONTAINS";
    param.dashboardId = dashboardId;
    param.paramName = paramName;
    param.paramValues = [];
    return param;
  }

  public static createDashboard(name: string, userId: string): Dashboard {
    let dashboard = new Dashboard();
    dashboard.name = name;
    dashboard.userId = userId;
    return dashboard;
  }

  public static convertToDbValues(value: string): string {
    let dbValue = value.replace(" ", "_");
    dbValue = dbValue.toUpperCase();
    return dbValue;
  }

  public ngOnDestroy(): void {
    this.dashBoardService.deleteDashboard(this.dashboardId).subscribe();
  }
}
