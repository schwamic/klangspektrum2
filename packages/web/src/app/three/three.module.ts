import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RendererComponent } from './renderer/renderer.component'
import { RaycastingTestComponent } from './lab/raycasting-test.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RendererComponent,
    RaycastingTestComponent
  ],
  exports: [
    RendererComponent,
    RaycastingTestComponent
  ]
})
export class ThreeModule {}
