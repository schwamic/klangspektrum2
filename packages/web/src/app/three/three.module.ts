import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RendererComponent } from './renderer/renderer.component';
import { TestsComponent } from './tests/tests.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RendererComponent, TestsComponent],
  exports: [
    RendererComponent, TestsComponent
  ]
})
export class ThreeModule {}
