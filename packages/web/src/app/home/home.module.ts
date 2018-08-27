import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '@app/shared/shared.module'
import { HomeComponent } from './components/home/home.component'
import { HomeRoutingModule } from 'app/home/home-routing.module'

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule {}
