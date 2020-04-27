import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'e2m-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['../../../../assets/styles/pages/dashboards/dashboards.component.less']
})
export class DashboardsComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  public navigateToSearch(): void {
    this.router.navigate(['search']);
  }

}
