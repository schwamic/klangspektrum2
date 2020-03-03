import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { ErrorComponent } from '@app/shared/components/error/error.component'
import { ProfileComponent } from './containers/profile/profile.component'

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'player', pathMatch: 'full' },
      {
        path: 'player',
        loadChildren: () => import('./../player/player.module').then(m => m.PlayerModule)
      },
      {
        path: 'visualizer',
        loadChildren: () => import('./../visualizer/visualizer.module').then(m => m.VisualizerModule)
      }
    ]
  },
  { path: '**', component: ErrorComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
