import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { VisualizerComponent } from './containers/visualizer/visualizer.component'
import { SharedModule } from '@app/shared/shared.module'
import { ChartsModule } from 'ng2-charts'
import { VisualizerRoutingModule } from './visualizer-routing.module'

@NgModule({
  imports: [CommonModule, SharedModule, VisualizerRoutingModule, ChartsModule],
  declarations: [VisualizerComponent]
})
export class VisualizerModule {}
