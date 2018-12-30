import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core'
import { Store, select } from '@ngrx/store'
import * as fromRoot from '../../../core/store'
import { MatPaginator, MatTableDataSource } from '@angular/material'
import { combineLatest, Subscription } from 'rxjs'
import { StateService } from '@app/core/services/state.service'
import { SelectionModel } from '@angular/cdk/collections'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator
  dataSource
  selection = new SelectionModel(true, [])
  subscription: Subscription

  constructor(private store: Store<fromRoot.State>, private stateService: StateService) {}

  ngOnInit() {
    this.subscription = combineLatest(
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
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  /**
   * Select item in table
   * @param row
   */
  select(row) {
    this.selection.clear()
    this.selection.select(row)
  }
}
