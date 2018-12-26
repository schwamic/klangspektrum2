import { Component, OnInit } from '@angular/core'

import { PlayerService } from '../../../core/services/player.service'

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {
  player
  constructor(private playerService: PlayerService) {}
  isPlaying = false
  isShuffle = false
  isRepeat = false

  ngOnInit() {
    // this.playerService.isLoaded().then(res => {
    //   // @ts-ignore
    //   console.log(window.Spotify)
    // })
    this.playerService.isLoaded().then(() => {
      this.playerService.isConnected().subscribe(player => {
        this.player = player
        // console.log({ player })
      })
    })
  }
}
