import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ErrorComponent } from './components/error/error.component'
import { MaterialModule } from './modules/material/material.module'
import { HeaderComponent } from './components/header/header.component'
import { RouterModule } from '@angular/router'
import { TimePipe } from './pipes/time.pipe'
import { SliderModule } from './modules/slider/slider.module'
import { RangePipe } from './pipes/range.pipe'

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule, SliderModule],
  declarations: [ErrorComponent, HeaderComponent, TimePipe, RangePipe],
  exports: [
    MaterialModule,
    HeaderComponent,
    ErrorComponent,
    RouterModule,
    TimePipe,
    SliderModule,
    RangePipe
  ]
})
export class SharedModule {}
