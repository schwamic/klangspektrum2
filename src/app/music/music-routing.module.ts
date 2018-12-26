import { RouterModule, Routes } from '@angular/router'

import { MusicComponent } from './containers/music/music.component';
import { NgModule } from '@angular/core'
import { NotFoundComponent } from '@app/core/components/not-found/not-found.component'
import { ProfileGuard } from '@app/core/guards/profile.guard'

const routes: Routes = [
  { path: '', canActivate: [ProfileGuard], component: MusicComponent },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProfileGuard]
})
export class MusicRoutingModule {}
