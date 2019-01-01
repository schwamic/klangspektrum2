import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { ProfileGuard } from '@app/core/guards/profile.guard'
import { PlayerComponent } from './containers/player/player.component'
import { PlayerGuard } from '@app/core/guards/player.guard'
import { ErrorComponent } from '@app/shared/components/error/error.component'

const routes: Routes = [
  { path: '', canActivate: [ProfileGuard, PlayerGuard], component: PlayerComponent },
  { path: '**', component: ErrorComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProfileGuard, PlayerGuard]
})
export class PlayerRoutingModule {}
