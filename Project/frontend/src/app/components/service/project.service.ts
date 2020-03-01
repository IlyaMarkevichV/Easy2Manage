import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../model/project";

@Injectable({
  providedIn: "root"
})
export class ProjectService {

  constructor(private http: HttpClient) {}

  getProjects(projectId: number, offset: number, limit: number): Observable<Project[]> {
    return this.http.get<Project[]>("api/project?limit=" + limit + "&offset=" + offset);
  }

  saveProject(project: Project): Observable<void> {
    return this.http.post<void>("api/project/create", project);
  }

  getProject(projectId: string): Observable<Project> {
    return this.http.get<Project>("api/project/" + projectId);
  }

}
