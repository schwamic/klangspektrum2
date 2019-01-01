import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

import { ErrorComponent } from '@app/shared/components/error/error.component'
import { MetaGuard } from '@app/core/guards/meta.guard'
import { NgModule } from '@angular/core'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'callback', canActivate: [MetaGuard], component: ErrorComponent },
  {
    path: 'player',
    loadChildren: './player/player.module#PlayerModule'
  },
  {
    path: 'visualizer',
    loadChildren: './visualizer/visualizer.module#VisualizerModule'
  },
  { path: '**', component: ErrorComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule],
  providers: [MetaGuard]
})
export class AppRoutingModule {}
