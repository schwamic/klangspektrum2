import { CommonModule } from '@angular/common'
import { InstanceTestComponent } from './lab/instance-test.component'
import { NgModule } from '@angular/core'
import { OctreeTestComponent } from './lab/octree-test.component'
import { RaycastingTestComponent } from './lab/raycasting-test.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RaycastingTestComponent,
    OctreeTestComponent,
    InstanceTestComponent
  ],
  exports: [
    RaycastingTestComponent,
    OctreeTestComponent,
    InstanceTestComponent
  ]
})
export class ThreeModule {}
