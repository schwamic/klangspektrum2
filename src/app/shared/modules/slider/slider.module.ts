import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SliderComponent } from './slider.component'
import { NouisliderModule } from 'ng2-nouislider'

@NgModule({
  declarations: [SliderComponent],
  imports: [CommonModule, NouisliderModule],
  exports: [SliderComponent]
})
export class SliderModule {}
