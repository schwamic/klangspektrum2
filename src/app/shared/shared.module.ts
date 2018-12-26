import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ErrorComponent } from './components/error/error.component'
import { MaterialModule } from './modules/material.module'
import { HeaderComponent } from './components/header/header.component'
import { RouterModule } from '@angular/router'
import { TimePipe } from './pipes/time.pipe'

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: [ErrorComponent, HeaderComponent, TimePipe],
  exports: [MaterialModule, HeaderComponent, ErrorComponent, RouterModule, TimePipe]
})
export class SharedModule {}
