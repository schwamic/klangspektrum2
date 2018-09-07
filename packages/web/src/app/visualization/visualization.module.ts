import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '@app/shared/shared.module'
import { VisualizationComponent } from './containers/visualization/visualization.component'
import { DetailViewComponent } from './containers/detail-view/detail-view.component'
import { VisualizationRoutingModule } from './visualization-routing.module';
import { FilterComponent } from './components/filter/filter.component'

@NgModule({
  imports: [
    CommonModule,
    VisualizationRoutingModule,
    SharedModule
  ],
  declarations: [VisualizationComponent, DetailViewComponent, FilterComponent]
})
export class VisualizationModule {}
