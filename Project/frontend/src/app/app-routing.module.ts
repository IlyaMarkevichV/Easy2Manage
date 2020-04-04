import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingComponent} from './components/pages/landing/landing.component';
import {ProjectInfoComponent} from "./components/pages/project-info/project-info.component";
import {TicketInfoComponent} from "./components/pages/ticket-info/ticket-info.component";
import {TicketDetailsComponent} from './components/pages/ticket-details/ticket-details.component';


const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'projects', component: ProjectInfoComponent},
  {path: 'project', component: TicketInfoComponent},
  {path: 'ticket', component: TicketDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
