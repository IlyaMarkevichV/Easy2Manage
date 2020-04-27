import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingComponent} from './components/pages/landing/landing.component';
import {ProjectInfoComponent} from "./components/pages/project-info/project-info.component";
import {TicketInfoComponent} from "./components/pages/ticket-info/ticket-info.component";
import {TicketDetailsComponent} from './components/pages/ticket-details/ticket-details.component';
import {UserRegistrationComponent} from './components/pages/user-registration/user-registration.component';
import {SearchComponent} from './components/pages/search/search.component';
import {DashboardsComponent} from './components/pages/dashboards/dashboards.component';


const routes: Routes = [
  {path: '', component: LandingComponent, },
  {path: 'projects', component: ProjectInfoComponent},
  {path: 'project', component: TicketInfoComponent},
  {path: 'ticket', component: TicketDetailsComponent},
  {path: 'registration', component: UserRegistrationComponent},
  {path: 'search', component: SearchComponent},
  {path: 'dashboards', component: DashboardsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
