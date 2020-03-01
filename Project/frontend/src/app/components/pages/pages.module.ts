import {LandingComponent} from './landing/landing.component';
import {SharedModule} from '../shared/shared.module';
import {NgModule} from '@angular/core';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { TicketInfoComponent } from './ticket-info/ticket-info.component';


@NgModule({
  declarations: [
    LandingComponent,
    ProjectInfoComponent,
    TicketInfoComponent
  ],
  imports: [
    SharedModule
  ],
  providers: []
})
export class PagesModule {
}
