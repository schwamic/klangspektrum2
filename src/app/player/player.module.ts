import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PlayerComponent } from './containers/player/player.component'
import { PlayerRoutingModule } from './player-routing.module'
import { SharedModule } from '@app/shared/shared.module'
import { FilterComponent } from './components/filter/filter.component'
import { ReactiveFormsModule } from '@angular/forms'
import { NouisliderModule } from 'ng2-nouislider'
import { PlayerControllerComponent } from './components/player-controller/player-controller.component'
import { TrackComponent } from './components/track/track.component'

@NgModule({
  imports: [CommonModule, SharedModule, PlayerRoutingModule, ReactiveFormsModule, NouisliderModule],
  declarations: [PlayerComponent, FilterComponent, PlayerControllerComponent, TrackComponent]
})
export class PlayerModule {}
