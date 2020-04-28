import {Component, OnInit} from '@angular/core';
import {PriorityEnum} from '../../enum/priority.enum';
import {StatusEnum} from '../../enum/status.enum';
import {TypeEnum} from '../../enum/type.enum';
import {FilterValue} from '../../model/filter-value';
import {Ticket} from '../../model/ticket';
import {Router} from '@angular/router';
import {FilterService} from '../../service/filter.service';
import {FilterParam} from '../../model/filterParam';

export enum FiltersEnum {
  Project = 'project',
  Status = 'status',
  Type = 'type',
  Priority = 'priority',
  Assignee = 'assignee',
  Reporter = 'reporter'
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

  public tickets: Ticket[];

  public filters: Map<string, FilterValue[]> = new Map<string, FilterValue[]>();

  constructor(private router: Router,
              private filterService: FilterService) {
  }

  ngOnInit() {
    this.initFilters();
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
    this.filtersReady = true;
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

  }

  public saveFilters(): void {

  }

  public navigateToTicket(ticketId: string): void {
    this.router.navigate(['ticket'], {
      queryParams: {
        id: ticketId
      }
    });
  }

  public setDashboardPopupVisible(): void {
    this.dashboardNamePopupVisible = !this.dashboardNamePopupVisible;
  }

  modifyFilter(dashboardId: string, valueMap: Map<string, FilterValue[]>): void {
    this.filterService.deleteFilter(dashboardId).subscribe(() => {
      this.filterService.createFilter(dashboardId, "Filter").subscribe(() => {
        valueMap.forEach((values, key, map) => {
          let param = new FilterParam();
          param.modifier = "CONTAINS";
          param.dashboardId = dashboardId;
          param.paramName = key;
          values.filter(value => value.selected).forEach(value => param.paramValues.push(value.name));
          this.filterService.addParam(param).subscribe();
        })
      })
    })
  }
}
