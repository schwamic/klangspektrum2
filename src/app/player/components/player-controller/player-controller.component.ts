import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core'
import { PlayerService } from '../../../core/services/player.service'
import { shareReplay, first, tap } from 'rxjs/operators'
import { Subscription, combineLatest } from 'rxjs'
import { Throttle } from 'lodash-decorators/throttle'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-player-controller',
  templateUrl: './player-controller.component.html',
  styleUrls: ['./player-controller.component.scss']
})
export class PlayerControllerComponent implements OnInit, OnDestroy {
  @Output() next = new EventEmitter()
  @Output() prev = new EventEmitter()
  playerReady = false
  shuffle$ = this.playerService.getShuffleState()
  isPlaying$ = this.playerService.isPlaying()
  sub = new Subscription()
  track$ = this.playerService.getCurrentTrack().pipe(tap(track => this.setCover(track)))
  cover

  constructor(public playerService: PlayerService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.sub.add(
      this.playerService.stateChanges().subscribe(state => {
        if ((state as any).paused) {
          this.playerService.pause()
        }
      })
    )
  }

  ngOnDestroy() {
    this.playerService.setCurrentTrack(null)
    this.playerService.pause()
    this.sub.unsubscribe()
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

  /**
   * helper to set cover
   */
  setCover(track) {
    if (!!track) {
      this.cover = this.sanitizer.bypassSecurityTrustStyle(`url( ${track.images[0].url})`)
    }
  }
}
