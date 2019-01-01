import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core'
import { PlayerService } from '../../../core/services/player.service'
import { shareReplay, first, switchMap, filter, tap } from 'rxjs/operators'
import { StateService } from '@app/core/services/state.service'
import { Subscription, combineLatest } from 'rxjs'

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  @Output() next = new EventEmitter()
  @Output() prev = new EventEmitter()
  @Output() shuffle = new EventEmitter()
  shuffleState = false
  playerReady = false
  isPlaying$ = this.playerService.isPlaying().pipe(shareReplay(1))
  sub = new Subscription()
  track
  constructor(public playerService: PlayerService, private stateService: StateService) {}

  ngOnInit() {
    this.sub.add(
      this.playerService.stateChanges().subscribe(state => {
        if ((state as any).paused) {
          this.playerService.pause()
        }
      })
    )

    this.sub.add(
      this.stateService
        .getCurrentTrack()
        .pipe(
          filter(track => !!track),
          tap(track => (this.track = track)),
          switchMap(track => this.playerService.play(track['uri']))
        )
        .subscribe()
    )
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  toggle() {
    combineLatest(this.isPlaying$, this.stateService.getCurrentTrack())
      .pipe(first())
      .subscribe(([state, track]) => {
        if (!state) {
          this.playerService
            .play(track.uri)
            .pipe(first())
            .subscribe()
        } else {
          this.playerService.pause()
        }
      })
  }

  repeat() {
    this.playerService.toggleRepeat().subscribe()
  }

  onNext() {
    this.next.emit()
  }
  onPrev() {
    this.prev.emit()
  }
  onShuffle() {
    this.shuffleState = !this.shuffleState
    this.shuffle.emit(this.shuffleState)
  }
}
