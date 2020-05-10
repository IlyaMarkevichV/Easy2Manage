import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../model/project";

@Injectable({
  providedIn: "root"
})
export class ProjectService {

  constructor(private http: HttpClient) {
  }

  getProjects(offset: number, limit: number): Observable<Project[]> {
    return this.http.get<Project[]>("api/project?limit=" + limit + "&offset=" + offset);
  }

  saveProject(project: Project): Observable<Project> {
    const json = JSON.stringify(project);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};
    return this.http.post<Project>("api/project/create", json, options);
  }

  getProject(projectId: string): Observable<Project> {
    return this.http.get<Project>("api/project/" + projectId);
  }

  getTotalNumberOfProjects(): Observable<number> {
    return this.http.get<number>("api/project/total");
  }

}
