import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from './components/pages/landing/landing.component';
import {ProjectInfoComponent} from "./components/pages/project-info/project-info.component";


const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'projects', component: ProjectInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
