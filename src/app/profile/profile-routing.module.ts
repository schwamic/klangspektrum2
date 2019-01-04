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
        loadChildren: './../player/player.module#PlayerModule'
      },
      {
        path: 'visualizer',
        loadChildren: './../visualizer/visualizer.module#VisualizerModule'
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
