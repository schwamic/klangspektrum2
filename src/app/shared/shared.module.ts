import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ErrorComponent } from './components/error/error.component'
import { MaterialModule } from './modules/material/material.module'
import { HeaderComponent } from './components/header/header.component'
import { RouterModule } from '@angular/router'
import { TimePipe } from './pipes/time.pipe'
import { RangePipe } from './pipes/range.pipe'
import { RefreshAuthDialogComponent } from './components/refresh-auth-dialog/refresh-auth-dialog.component'

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: [ErrorComponent, HeaderComponent, RefreshAuthDialogComponent, TimePipe, RangePipe],
  exports: [
    MaterialModule,
    RouterModule,
    HeaderComponent,
    ErrorComponent,
    RefreshAuthDialogComponent,
    TimePipe,
    RangePipe
  ],
  entryComponents: [RefreshAuthDialogComponent]
})
export class SharedModule {}
