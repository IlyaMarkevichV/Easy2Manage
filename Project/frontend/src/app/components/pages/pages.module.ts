import {LandingComponent} from './landing/landing.component';
import {SharedModule} from '../shared/shared.module';
import {NgModule} from '@angular/core';
import {ProjectInfoComponent} from './project-info/project-info.component';
import {TicketInfoComponent} from './ticket-info/ticket-info.component';
import {TicketDetailsComponent} from './ticket-details/ticket-details.component';
import {CommonModule} from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ChartsModule} from 'ng2-charts';
import {UserRegistrationComponent} from './user-registration/user-registration.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SearchComponent} from './search/search.component';
import {DashboardsComponent} from './dashboards/dashboards.component';


@NgModule({
  declarations: [
    LandingComponent,
    ProjectInfoComponent,
    TicketInfoComponent,
    TicketDetailsComponent,
    UserRegistrationComponent,
    SearchComponent,
    DashboardsComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    DragDropModule,
    ChartsModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class PagesModule {
}
