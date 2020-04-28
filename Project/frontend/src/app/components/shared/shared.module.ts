import {NavigationBarComponent} from './navigation-bar/navigation-bar.component';
import {NgModule} from '@angular/core';
import {SharedPopupComponent} from './shared-popup/shared-popup.component';
import {CreateProjectPopupComponent} from './navigation-bar/components/create-project-popup/create-project-popup.component';
import {CreateTicketPopupComponent} from './navigation-bar/components/create-ticket-popup/create-ticket-popup.component';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {TicketEditPopupComponent} from './navigation-bar/components/ticket-edit-popup/ticket-edit-popup.component';
import { AssignTicketPopupComponent } from './navigation-bar/components/assign-ticket-popup/assign-ticket-popup.component';
import { LogWorkTicketPopupComponent } from './navigation-bar/components/log-work-ticket-popup/log-work-ticket-popup.component';
import { AuthorizationPopupComponent } from './navigation-bar/components/authorization-popup/authorization-popup.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    NavigationBarComponent,
    SharedPopupComponent,
    CreateProjectPopupComponent,
    CreateTicketPopupComponent,
    TicketEditPopupComponent,
    AssignTicketPopupComponent,
    LogWorkTicketPopupComponent,
    AuthorizationPopupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
    exports: [
        NavigationBarComponent,
        SharedPopupComponent
    ],
  providers: []
})
export class SharedModule {

}
