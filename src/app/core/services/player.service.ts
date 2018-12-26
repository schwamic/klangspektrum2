import * as fromRoot from '../../core/store'

import { Store, select } from '@ngrx/store'
import { filter, map } from 'rxjs/operators'

import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private store: Store<fromRoot.State>) {}

  /**
   * Handles loading-process of script
   * @returns {Promise<any>}
   */
  isLoaded(): Promise<any> {
    return new Promise(resolve => {
      // @ts-ignore
      if (window.Spotify) {
        resolve()
      } else {
        // @ts-ignore
        window.onSpotifyWebPlaybackSDKReady = resolve
      }
    })
  }

  isConnected(): Observable<any> {
    return this.store.pipe(
      // @ts-ignore
      filter(() => window.Spotify),
      select(fromRoot.selectExtendedProfile),
      map(profile => {
        // @ts-ignore
        const player = new window.Spotify.Player({
          name: 'Web Playback SDK Quick Start Player',
          getOAuthToken: cb => {
            cb(profile.token)
          }
        })
        // Error handling
        player.addListener('initialization_error', ({ message }) => {
          console.error(message)
        })
        player.addListener('authentication_error', ({ message }) => {
          console.error(message)
        })
        player.addListener('account_error', ({ message }) => {
          console.error(message)
        })
        player.addListener('playback_error', ({ message }) => {
          console.error(message)
        })

        // Playback status updates
        player.addListener('player_state_changed', state => {
          console.log(state)
        })

        // Ready
        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id)
        })

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id)
        })

        // Connect to the player!
        player.connect()
        
        return player
      })
    )
  }
}
