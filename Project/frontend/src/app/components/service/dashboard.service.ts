import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ticket} from "../model/ticket";
import {Dashboard} from '../model/dashboard';
import {Project} from '../model/project';

@Injectable({
  providedIn: "root"
})
export class DashboardService {

  constructor(private http: HttpClient) {}


  getDashboard(dashboardId: string): Observable<Dashboard> {
    return this.http.get<Dashboard>("api/dashboard/" + dashboardId);
  }

  getAllUserDashboards(userId: string): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>("api/dashboard/all?userId=" + userId);
  }

  createDashboard(dashboard: Dashboard): Observable<Dashboard> {
    const json = JSON.stringify(dashboard);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};
    return this.http.post<Dashboard>("api/dashboard/create", json, options);
  }

  deleteDashboard(dashboardId: string): Observable<void> {
    return this.http.delete<void>("api/dashboard/delete/" + dashboardId);
  }


}
