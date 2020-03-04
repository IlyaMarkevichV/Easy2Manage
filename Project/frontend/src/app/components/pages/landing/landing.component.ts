import { Component, OnInit } from '@angular/core';
import {Color, Label} from "ng2-charts";
import {ChartDataSets, ChartOptions} from "chart.js";
import {SharedEventsService} from "../../service/shared.events.service";

@Component({
  selector: 'e2m-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['../../../../assets/styles/pages/landing/landing.component.less']
})
export class LandingComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [100, 300, 400, 574, 800, 930, 1002]}
  ];
  public lineChartLabels: Label[] = ['September', 'October', 'November', 'December', 'January', 'February', 'March'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartType = 'line';

  constructor(private shareEvents: SharedEventsService) { }

  ngOnInit() {

  }

  public createProject() {
    this.shareEvents._setOnProjectCreate();
  }

}
