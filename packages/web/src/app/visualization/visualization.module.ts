import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizationComponent } from './containers/visualization/visualization.component';
import { DetailViewComponent } from './containers/detail-view/detail-view.component';
import {VisualizationRoutingModule} from "./visualization-routing.module";

@NgModule({
  imports: [
    CommonModule,
    VisualizationRoutingModule
  ],
  declarations: [VisualizationComponent, DetailViewComponent]
})
export class VisualizationModule { }
