import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingComponent} from './components/pages/landing/landing.component';
import {ProjectInfoComponent} from "./components/pages/project-info/project-info.component";
import {TicketInfoComponent} from "./components/pages/ticket-info/ticket-info.component";


const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'projects', component: ProjectInfoComponent},
  {path: 'tickets', component: TicketInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
