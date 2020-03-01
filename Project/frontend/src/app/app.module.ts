import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from './components/shared/shared.module';
import {PagesModule} from './components/pages/pages.module';
import {ProjectService} from "./components/service/project.service";
import {TicketService} from "./components/service/ticket.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PagesModule,
    HttpClientModule
  ],
  providers: [ProjectService, TicketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
