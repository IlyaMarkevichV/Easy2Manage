import {NavigationBarComponent} from './navigation-bar/navigation-bar.component';
import {NgModule} from '@angular/core';
import {SharedPopupComponent} from './shared-popup/shared-popup.component';
import {CreateProjectPopupComponent} from './navigation-bar/components/create-project-popup/create-project-popup.component';
import {CreateTicketPopupComponent} from './navigation-bar/components/create-ticket-popup/create-ticket-popup.component';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    NavigationBarComponent,
    SharedPopupComponent,
    CreateProjectPopupComponent,
    CreateTicketPopupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    NavigationBarComponent
  ],
  providers: []
})
export class SharedModule {

}
