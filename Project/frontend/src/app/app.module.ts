import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './components/shared/shared.module';
import {PagesModule} from './components/pages/pages.module';
import {ProjectService} from './components/service/project.service';
import {TicketService} from './components/service/ticket.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedEventsService} from './components/service/shared.events.service';
import {UserService} from './components/service/user.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './components/http/auth.interceptor';
import {LocalStorageProvider} from './components/service/local-storage.provider';
import {TokenProvider} from './components/http/token.provider';
import {AuthorizationService} from './components/service/authorization.service';
import {NotificationsService} from './components/service/notifications.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PagesModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    ProjectService,
    TicketService,
    UserService,
    SharedEventsService,
    LocalStorageProvider,
    TokenProvider,
    NotificationsService,
    AuthorizationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
