import { Component, OnDestroy, Output, EventEmitter } from '@angular/core'
import { PlayerService } from '../../../core/services/player.service'
import { first, filter } from 'rxjs/operators'
import { combineLatest } from 'rxjs'
import { Throttle } from 'lodash-decorators/throttle'

@Component({
  selector: 'app-player-controller',
  templateUrl: './player-controller.component.html',
  styleUrls: ['./player-controller.component.scss']
})
export class PlayerControllerComponent implements OnDestroy {
  @Output() next = new EventEmitter()
  @Output() prev = new EventEmitter()
  playerReady = false
  shuffle$ = this.playerService.getShuffleState()
  isPlaying$ = this.playerService.isPlaying()
  track$ = this.playerService.getCurrentTrack()

  constructor(public playerService: PlayerService) {}

  ngOnDestroy() {
    this.playerService.setCurrentTrack(null)
    this.playerService
      .isPlaying()
      .pipe(
        first(),
        filter(playing => playing)
      )
      .subscribe(() => {
        this.playerService.pause()
      })
  }

  @Throttle(300)
  toggle() {
    combineLatest(this.isPlaying$, this.playerService.getCurrentTrack())
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

  @Throttle(300)
  repeat() {
    this.playerService
      .toggleRepeat()
      .pipe(first())
      .subscribe()
  }

  @Throttle(300)
  onNext() {
    this.next.emit()
  }

  @Throttle(300)
  onPrev() {
    this.prev.emit()
  }

  @Throttle(300)
  onShuffle() {
    this.playerService.toggleShuffle()
  }
}
