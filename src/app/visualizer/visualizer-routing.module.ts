import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { ProfileGuard } from '@app/core/guards/profile.guard'
import { VisualizerComponent } from './containers/visualizer/visualizer.component'
import { PlayerGuard } from '@app/core/guards/player.guard'

const routes: Routes = [
  {
    path: '',
    canActivate: [ProfileGuard, PlayerGuard],
    pathMatch: 'full',
    component: VisualizerComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProfileGuard, PlayerGuard]
})
export class VisualizerRoutingModule {}
