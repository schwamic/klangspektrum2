import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PlayerComponent } from './containers/player/player.component'
import { PlayerRoutingModule } from './player-routing.module'
import { SharedModule } from '@app/shared/shared.module'
import { FilterComponent } from './components/filter/filter.component'
import { MusicPlayerComponent } from './components/music-player/music-player.component'
import { ReactiveFormsModule } from '@angular/forms'
import { NouisliderModule } from 'ng2-nouislider'

@NgModule({
  imports: [CommonModule, SharedModule, PlayerRoutingModule, ReactiveFormsModule, NouisliderModule],
  declarations: [PlayerComponent, FilterComponent, MusicPlayerComponent]
})
export class PlayerModule {}
