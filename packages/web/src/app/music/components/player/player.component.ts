import { Component, OnInit } from '@angular/core'

import { PlayerService } from '../../../core/services/player.service'

interface Player {}

@Component({
  selector: 'ks-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  player: Player
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
        console.log({ player })
      })
    })
  }
}
