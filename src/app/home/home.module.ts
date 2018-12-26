import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LandingpageComponent } from './components/landingpage/landingpage.component'
import { AboutComponent } from './components/about/about.component'
import { ImprintComponent } from './components/imprint/imprint.component'
import { HomeComponent } from './containers/home/home.component'
import { SharedModule } from '@app/shared/shared.module'
import { HomeRoutingModule } from '@app/home/home-routing.module'

@NgModule({
  imports: [CommonModule, HomeRoutingModule, SharedModule],
  declarations: [HomeComponent, LandingpageComponent, AboutComponent, ImprintComponent]
})
export class HomeModule {}
