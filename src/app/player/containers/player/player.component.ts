import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core'
import { Store, select } from '@ngrx/store'
import * as fromRoot from '../../../core/store'
import { MatPaginator, MatTableDataSource } from '@angular/material'
import { combineLatest, Subscription, Subject } from 'rxjs'
import { StateService } from '@app/core/services/state.service'
import { SelectionModel } from '@angular/cdk/collections'
import { map, first } from 'rxjs/operators'
import { MusicPlayerComponent } from '@app/player/components/music-player/music-player.component'

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MusicPlayerComponent) musicPlayerComponent: MusicPlayerComponent
  dataSource
  selection = new SelectionModel(true, [])
  sub = new Subscription()
  track
  shuffleState = false
  constructor(private store: Store<fromRoot.State>, private stateService: StateService) {}

  ngOnInit() {
    this.sub.add(
      combineLatest(
        this.store.pipe(select(fromRoot.selectTracksWithFeatures)),
        this.stateService.getFilterSettings()
      )
        .pipe(
          map(([tracks, filter]) => {
            return tracks.filter(track => {
              return (
                !!track.features &&
                (track.features.acousticness >= filter.acousticness[0] &&
                  track.features.acousticness <= filter.acousticness[1]) &&
                (track.features.danceability >= filter.danceability[0] &&
                  track.features.danceability <= filter.danceability[1]) &&
                (track.features.energy >= filter.energy[0] &&
                  track.features.energy <= filter.energy[1]) &&
                (track.features.instrumentalness >= filter.instrumentalness[0] &&
                  track.features.instrumentalness <= filter.instrumentalness[1]) &&
                (track.features.liveness >= filter.liveness[0] &&
                  track.features.liveness <= filter.liveness[1]) &&
                (track.features.speechiness >= filter.speechiness[0] &&
                  track.features.speechiness <= filter.speechiness[1]) &&
                (track.features.valence >= filter.valence[0] &&
                  track.features.valence <= filter.valence[1])
              )
            })
          })
        )
        .subscribe(tracks => {
          this.dataSource = new MatTableDataSource(tracks)
          this.dataSource.paginator = this.paginator
        })
    )

    this.sub.add(
      this.stateService
        .getCurrentTrack()
        .pipe(first())
        .subscribe(track => (this.track = track))
    )
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
  /**
   * Select item in table
   * @param row
   */
  select(row) {
    this.selection.clear()
    this.selection.select(row)
    this.stateService.setCurrentTrack(row)
  }

  next() {
    const selected = this.selection.selected[0]
    const index = this.dataSource.data.indexOf(selected)
    if (this.shuffleState) {
      const random = this.getRandomIntInclusive(0, this.dataSource.data.length)
      this.select(this.dataSource.data[random])
    } else {
      this.select(this.dataSource.data[index + 1])
    }
  }

  prev() {
    const selected = this.selection.selected[0]
    const index = this.dataSource.data.indexOf(selected)
    if (this.shuffleState) {
      const random = this.getRandomIntInclusive(0, this.dataSource.data.length)
      this.select(this.dataSource.data[random])
    } else {
      this.select(this.dataSource.data[index - 1])
    }
  }

  shuffle(state) {
    this.shuffleState = state
  }

  /**
   * The maximum is inclusive and the minimum is inclusive
   */
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
