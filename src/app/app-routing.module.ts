import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

import { ErrorComponent } from '@app/shared/components/error/error.component'
import { MetaGuard } from '@app/core/guards/meta.guard'
import { NgModule } from '@angular/core'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  {
    path: 'profile',
    canActivate: [MetaGuard],
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
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
