import {Component, OnInit} from '@angular/core';
import {PriorityEnum} from '../../enum/priority.enum';
import {StatusEnum} from '../../enum/status.enum';
import {TypeEnum} from '../../enum/type.enum';
import {FilterValue} from '../../model/filter-value';
import {Ticket} from '../../model/ticket';
import {Router} from '@angular/router';
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
import {NgxSpinnerService} from 'ngx-spinner';

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
export class SearchComponent implements OnInit {

  public priorities: any = PriorityEnum;
  public statuses: any = StatusEnum;
  public types: any = TypeEnum;
  public filtersEnum: any = FiltersEnum;

  public filtersReady: boolean = false;
  public contentReady: boolean = true;
  public dashboardNamePopupVisible: boolean = false;
  public dashboardId: string;
  public dashboardName: string = "Dashboard";
  public projects: Project[] = [];
  public users: User[] = [];

  public tickets: Ticket[];

  public filters: Map<string, FilterValue[]> = new Map<string, FilterValue[]>();

  constructor(private router: Router,
              private filterService: FilterService,
              private projectService: ProjectService,
              private userService: UserService,
              private dashBoardService: DashboardService) {
  }

  ngOnInit() {
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

  public saveFilters(): void {
    this.dashBoardService.createDashboard(SearchComponent.createDashboard(this.dashboardName)).subscribe(dashboard => {
      this.filterService.createFilter(dashboard.id, dashboard.name).subscribe(() => {
        this.addParams(dashboard.id);
        this.navigateToDashboards();
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
    this.router.navigate(['dashboards']);
  }

  public setDashboardPopupVisible(): void {
    this.dashboardNamePopupVisible = !this.dashboardNamePopupVisible;
  }

  modifyFilter(): void {
    this.filterService.deleteFilter(this.dashboardId).subscribe(() => {
      this.filterService.createFilter(this.dashboardId, "Filter").subscribe(() => {
        this.addParams(this.dashboardId);
      })
    })
  }

  addParams(dashboardId): void {
    this.filters.forEach((values, key, map) => {
      let param = new FilterParam();
      param.modifier = "CONTAINS";
      param.dashboardId = dashboardId;
      if (key == FiltersEnum.Project) {
        param.paramName = "project_id";
        param.paramValues = [];
        values.filter(value => value.selected).forEach(value => {
          this.projects.forEach(project => {
            if (project.name == value.name) {
              param.paramValues.push(project.id);
            }
          })
        })
      } else {
        param.paramName = key;
        param.paramValues = [];
        values.filter(value => value.selected).forEach(value =>
          param.paramValues.push(SearchComponent.convertToDbValues(value.name)));
      }
      if (param.paramValues.length != 0) {
        this.filterService.addParam(param).subscribe(filter => {
          console.log(filter.query);
        });
      }
    })
  }

  public addParamsA(dashboardId: string): void {
    let param = this.createParam(dashboardId, "project_id");
    this.filters.get(FiltersEnum.Project).filter(value => value.selected).forEach(value => {
      this.projects.forEach(project => {
        if (project.name == value.name) {
          param.paramValues.push(project.id);
        }
      })
    });
    if (param.paramValues.length != 0) {
      this.filterService.addParam(param).subscribe(filter => {
        console.log(filter.query);
        let param = this.createParam(dashboardId, "status");
        this.filters.get(FiltersEnum.Status).filter(value => )
      })
    }
  }

  public initDashboard(): void {
    this.dashBoardService.createDashboard(SearchComponent.createDashboard("Filter")).subscribe(dashboard => {
      this.dashboardId = dashboard.id;
      this.filterService.createFilter(this.dashboardId, "Filter").subscribe(() => {
        this.dashBoardService.getDashboard(this.dashboardId).subscribe(dashboard => {
          this.tickets = dashboard.tickets;
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

  public static createDashboard(name: string): Dashboard {
    let dashboard = new Dashboard();
    dashboard.name = name;
    dashboard.userId = "1";
    return dashboard;
  }

  public static convertToDbValues(value: string): string {
    let dbValue = value.replace(" ", "_");
    dbValue = dbValue.toUpperCase();
    return dbValue;
  }
}
