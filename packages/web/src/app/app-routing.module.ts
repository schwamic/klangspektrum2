import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

import { ErrorComponent } from '@app/shared/components/error/error.component'
import { MetaGuard } from '@app/core/guards/meta.guard'
import { NgModule } from '@angular/core'
import { NotFoundComponent } from '@app/core/components/not-found/not-found.component'

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadChildren: './home/home.module#HomeModule'},
  {path: 'callback', canActivate: [MetaGuard], component: ErrorComponent},
  {path: 'music', loadChildren: './music/music.module#MusicModule'},
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule],
  providers: [MetaGuard]
})

export class AppRoutingModule {
}
