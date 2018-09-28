import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ErrorComponent } from './components/error/error.component'
import { MaterialModule } from './material.module'

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    ErrorComponent
  ],
  exports: [
    MaterialModule
  ]
})
export class SharedModule {}
