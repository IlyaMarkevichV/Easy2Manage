import {LandingComponent} from './landing/landing.component';
import {SharedModule} from '../shared/shared.module';
import {NgModule} from '@angular/core';
import {ProjectsComponent} from './projects/projects.component';
import {ProjectDetailsComponent} from './project-details/project-details.component';
import {TicketDetailsComponent} from './ticket-details/ticket-details.component';
import {CommonModule} from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ChartsModule} from 'ng2-charts';
import {UserRegistrationComponent} from './user-registration/user-registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SearchComponent} from './search/search.component';
import {DashboardsComponent} from './dashboards/dashboards.component';
import {NgxSpinnerModule} from 'ngx-spinner';


@NgModule({
  declarations: [
    LandingComponent,
    ProjectsComponent,
    ProjectDetailsComponent,
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
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule
  ],
  providers: []
})
export class PagesModule {
}
