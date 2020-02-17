
import {LandingComponent} from './landing/landing.component';
import {SharedModule} from '../shared/shared.module';
import {NgModule} from '@angular/core';


@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    SharedModule
  ],
  providers: []
})
export class PagesModule {
}
