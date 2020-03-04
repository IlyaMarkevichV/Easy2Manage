import {LandingComponent} from './landing/landing.component';
import {SharedModule} from '../shared/shared.module';
import {NgModule} from '@angular/core';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { TicketInfoComponent } from './ticket-info/ticket-info.component';
import {CommonModule} from "@angular/common";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ChartsModule} from "ng2-charts";


@NgModule({
  declarations: [
    LandingComponent,
    ProjectInfoComponent,
    TicketInfoComponent
  ],
    imports: [
        SharedModule,
        CommonModule,
        DragDropModule,
        ChartsModule
    ],
  providers: []
})
export class PagesModule {
}
