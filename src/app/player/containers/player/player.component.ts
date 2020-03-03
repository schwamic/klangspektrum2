import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core'
import { Store, select } from '@ngrx/store'
import * as fromRoot from '../../../core/store'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { combineLatest, Subscription } from 'rxjs'
import { StateService } from '@app/core/services/state.service'
import { SelectionModel } from '@angular/cdk/collections'
import { map, first } from 'rxjs/operators'
import { Throttle } from 'lodash-decorators/throttle'
import { PlayerService } from '@app/core/services/player.service'

@Component({
	selector: 'app-player',
	templateUrl: './player.component.html',
	styleUrls: [ './player.component.scss' ]
})
export class PlayerComponent implements OnInit, OnDestroy {
	@ViewChild(MatPaginator, { static: true })
	paginator: MatPaginator
	dataSource
	selection = new SelectionModel(true, [])
	sub = new Subscription()
	track$ = this.playerService.getCurrentTrack()
	shuffleState$ = this.playerService.getShuffleState()
	profile$ = this.store.pipe(select(fromRoot.selectProfile))

	constructor(
		private store: Store<fromRoot.State>,
		private stateService: StateService,
		private playerService: PlayerService
	) {}

	ngOnInit() {
		this.sub.add(
			combineLatest(
				this.store.pipe(select(fromRoot.selectTracksWithFeatures)),
				this.stateService.getFilterSettings()
			)
				.pipe(
					map(([ tracks, filter ]) => {
						return tracks.filter((track) => {
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
				.subscribe((tracks) => {
					this.dataSource = new MatTableDataSource(tracks)
					this.dataSource.paginator = this.paginator
				})
		)
	}

	ngOnDestroy() {
		this.sub.unsubscribe()
	}
	/**
  * Select item in table and set new track
  * @param row
  */
	@Throttle(300)
	select(row) {
		this.selection.clear()
		this.selection.select(row)
		this.playerService.setCurrentTrack(row)
		this.playerService.play(row.uri).pipe(first()).subscribe()
	}

	selectData(state: string) {
		const selected = this.selection.selected[0]
		const index = this.dataSource.data.indexOf(selected)
		this.playerService.getShuffleState().pipe(first()).subscribe((shuffleState) => {
			if (shuffleState) {
				const random = this.getRandomIntInclusive(0, this.dataSource.data.length)
				this.select(this.dataSource.data[random])
			} else {
				let newIndex = state === 'next' ? index + 1 : index - 1
				newIndex = newIndex < 0 ? 0 : newIndex
				newIndex = newIndex > this.dataSource.data.length ? this.dataSource.data.length : newIndex
				this.select(this.dataSource.data[newIndex])
			}
		})
	}

	/**
  * The maximum and minimum are inclusive
  */
	getRandomIntInclusive(min, max) {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min + 1)) + min
	}
}
