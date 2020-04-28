import { Component, OnInit } from '@angular/core';
import {FilterParam} from '../../model/filterParam';
import {FilterValue} from '../../model/filter-value';
import {FilterService} from '../../service/filter.service';

@Component({
  selector: 'e2m-search',
  templateUrl: './search.component.html',
  styleUrls: ['../../../../assets/styles/pages/filter/search.component.less']
})
export class SearchComponent implements OnInit {

  constructor(private filterService: FilterService) { }

  ngOnInit() {
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
