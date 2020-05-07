import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Dashboard} from '../../model/dashboard';
import {DashboardService} from '../../service/dashboard.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'e2m-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['../../../../assets/styles/pages/dashboards/dashboards.component.less']
})
export class DashboardsComponent implements OnInit {

  public dashboards: Dashboard[];

  public contentReady: boolean = false;
  public userId: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private dashboardService: DashboardService,
              private spinnerService: NgxSpinnerService) {
  }

  ngOnInit() {
    this.initDashboards();
  }

  private initDashboards(): void {
    this.spinnerService.show();
    this.activatedRoute.queryParamMap.subscribe((params: any) => {
      this.userId = params.get('userId');
      this.dashboardService.getAllUserDashboards(this.userId).subscribe((data: Dashboard[]) => {
        this.dashboards = data;
        this.contentReady = true;
        this.spinnerService.hide();
      });
    });
  }

  public navigateToSearch(): void {
    this.router.navigate(['search'], {
      queryParams: {
        userId: this.userId
      }
    });
  }

  public navigateToTicket(ticketId: string): void {
    this.router.navigate(['ticket'], {
      queryParams: {
        id: ticketId
      }
    });
  }

}
