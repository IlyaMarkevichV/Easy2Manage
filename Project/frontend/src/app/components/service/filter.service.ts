import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Filter} from '../model/filter';
import {FilterParam} from '../model/filterParam';

@Injectable({
  providedIn: "root"
})
export class FilterService {

  constructor(private http: HttpClient) {}

  createFilter(dashboardId: string, name: string): Observable<Filter> {
    return this.http.post<Filter>("api/filter/create?dashboardId=" + dashboardId + "&name=" + name, null);
  }

  addParam(param: FilterParam): Observable<Filter> {
    const json = JSON.stringify(param);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};
    return this.http.post<Filter>("api/filter/addParam", json, options)
  }

  deleteFilter(dashboardId: string): Observable<void> {
    return this.http.delete<void>("api/dashboard/delete?dashboardId=" + dashboardId);
  }

}
