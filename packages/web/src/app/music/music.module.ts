import { ChartsModule } from 'ng2-charts/ng2-charts'
import { CommonModule } from '@angular/common'
import { FilterComponent } from './components/filter/filter.component'
import { MusicComponent } from './containers/music/music.component'
import { MusicRoutingModule } from './music-routing.module'
import { NgModule } from '@angular/core'
import { PlaylistComponent } from './containers/playlist/playlist.component'
import { SharedModule } from '@app/shared/shared.module'
import { ThreeModule } from '@app/three/three.module'
import { VisualizationComponent } from './containers/visualization/visualization.component';
import { PlayerComponent } from './components/player/player.component';

@NgModule({
  imports: [CommonModule, MusicRoutingModule, ThreeModule, SharedModule, ChartsModule],
  declarations: [VisualizationComponent, PlaylistComponent, FilterComponent, MusicComponent, PlayerComponent]
})
export class MusicModule {}
