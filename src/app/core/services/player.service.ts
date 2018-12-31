import * as fromRoot from '../../core/store'
import { Store, select } from '@ngrx/store'
import { filter, map, tap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject, Subject, of } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private player
  private error = new BehaviorSubject(false)
  private ready = new BehaviorSubject(false)
  private state = new Subject()
  private repeat = false
  private playing = new BehaviorSubject(false)
  public deviceID

  constructor(private store: Store<fromRoot.State>, private http: HttpClient) {}

  /**
   * Connect
   */
  connect(): Observable<boolean> {
    return this.store.pipe(
      filter(() => !!window['Spotify']),
      select(fromRoot.selectExtendedProfile),
      map(profile => {
        // If player exists, return
        if (this.player) {
          return true
        }

        // If player does not exists, create
        this.player = new window['Spotify'].Player({
          name: 'Klangspektrum',
          getOAuthToken: cb => {
            cb(profile.token)
          }
        })
        // Error handling
        /* tslint:disable no-console */
        this.player.addListener('initialization_error', ({ message }) => {
          console.error(message)
          this.error.next(true)
        })
        this.player.addListener('authentication_error', ({ message }) => {
          console.error(message)
          this.error.next(true)
        })
        this.player.addListener('account_error', ({ message }) => {
          console.error(message)
          this.error.next(true)
        })
        this.player.addListener('playback_error', ({ message }) => {
          console.error(message)
          this.error.next(true)
        })

        // Playback status updates
        this.player.addListener('player_state_changed', state => {
          this.state.next(state)
        })

        // Ready
        this.player.addListener('ready', ({ device_id }) => {
          this.deviceID = device_id
          this.ready.next(true)
        })

        // Not Ready
        this.player.addListener('not_ready', ({ device_id }) => {
          console.error('Device ID has gone offline', device_id)
          this.deviceID = device_id
          this.ready.next(false)
        })

        // Connect to the player!
        this.player.connect()
        return true
      })
    )
  }

  isPlaying(): Observable<boolean> {
    return this.playing.asObservable()
  }
  isReady(): Observable<boolean> {
    return this.ready.asObservable()
  }
  hasError(): Observable<boolean> {
    return this.error.asObservable()
  }
  stateChanges() {
    return this.state.asObservable()
  }

  play(spotify_uri): Observable<any> {
    this.playing.next(true)
    return this.http.put(
      `https://api.spotify.com/v1/me/player/play?device_id=${this.player._options.id}`,
      JSON.stringify({ uris: [spotify_uri] })
    )
  }

  pause(): void {
    this.playing.next(false)
    this.player.pause()
  }

  toggleRepeat(): Observable<any> {
    this.repeat = !this.repeat
    return this.http.put(
      `https://api.spotify.com/v1/me/player/repeat?state=${this.repeat ? 'context' : 'off'}`,
      {}
    )
  }

  // Getter
  getRepeatState() {
    return of(this.repeat)
  }
}
