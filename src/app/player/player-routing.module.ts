import { RouterModule, Routes } from '@angular/router'

import { NgModule } from '@angular/core'
import { NotFoundComponent } from '@app/core/components/not-found/not-found.component'
import { ProfileGuard } from '@app/core/guards/profile.guard'
import { PlayerComponent } from './containers/player/player.component'
import { PlayerGuard } from '@app/core/guards/player.guard'

const routes: Routes = [
  { path: '', canActivate: [ProfileGuard, PlayerGuard], component: PlayerComponent },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProfileGuard, PlayerGuard]
})
export class PlayerRoutingModule {}
