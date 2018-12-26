import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { NotFoundComponent } from '@app/core/components/not-found/not-found.component'
import { ProfileGuard } from '@app/core/guards/profile.guard'
import { VisualizerComponent } from './containers/visualizer/visualizer.component'

const routes: Routes = [
  { path: '', canActivate: [ProfileGuard], component: VisualizerComponent },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProfileGuard]
})
export class VisualizerRoutingModule {}
