import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Store } from '@ngrx/store'
import * as fromStore from '@app/core/store'
import { forkJoin, from, merge, Observable, of, empty } from 'rxjs'
import {
  catchError,
  mergeMap,
  map,
  switchMap,
  first,
  scan,
  tap,
  delay,
  retryWhen
} from 'rxjs/operators'
import { Track } from '@app/shared/models/track.model'

/**
 * INFO: Store has no duplicates because ids from spotify are also used as id in ngrx-adapter
 * https://stackoverflow.com/questions/43027201/is-there-a-way-to-manage-concurrency-with-rxjs
 * mergeMap(concurrently:number) or merge(concurrently:number) -> ensure to load not too much in parallel
 */

// TODO
// + error-handling + types

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  urlMe = offset => `https://api.spotify.com/v1/me/tracks?limit=50&offset=${offset}`
  urlPlaylist = (user_id, offset) =>
    `https://api.spotify.com/v1/users/${user_id}/playlists?limit=50&offset=${offset}`
  urlPlaylistTracks = (href, offset) => `${href}?limit=100&offset=${offset}`

  constructor(private http: HttpClient, private store: Store<fromStore.State>) {}

  getAllTracks(): Observable<any> {
    return forkJoin(
      merge(this.getPlaylistTracks(), this.getSavedTracks()).pipe(
        scan((acc, tracks) => [...acc, ...tracks], [])
      )
    ).pipe(map(tracks => tracks[0]))
  }

  getSavedTracks(): Observable<Track[]> {
    return this.getData(this.urlMe(0)).pipe(
      first(),
      switchMap(res => {
        if (res['total'] > 50) {
          return from(
            Array.apply(null, Array(Math.ceil(res['total'] / 50))).map((x, i) => {
              return i * 50
            })
          ).pipe(
            mergeMap(offset => this.getData(this.urlMe(offset)), null, 4),
            map(data =>
              Object.values(data['items'])
                .filter(item => !!item['track'])
                .map(item => this.mapTrack(item['track']))
            )
          )
        } else {
          return of(res).pipe(
            map(data =>
              Object.values(data['items'])
                .filter(item => !!item['track'])
                .map(item => this.mapTrack(item['track']))
            )
          )
        }
      })
    )
  }

  getPlaylists(): Observable<any> {
    return this.loadPlaylists(0).pipe(
      first(),
      switchMap(res => {
        if (res.total > 50) {
          return from(
            Array.apply(null, Array(Math.ceil(res.total / 50))).map((x, i) => {
              return i * 50
            })
          ).pipe(
            mergeMap(offset => this.loadPlaylists(offset), null, 4),
            map(data => Object.values(data.items).map(item => item['tracks']))
          )
        } else {
          return of(res).pipe(map(data => Object.values(data.items).map(item => item['tracks'])))
        }
      })
    )
  }

  getPlaylistTracks(): Observable<Track[]> {
    return this.getPlaylists().pipe(
      first(),
      mergeMap(
        playlist =>
          from(playlist).pipe(
            mergeMap(tracks =>
              Array.apply(null, Array(Math.ceil(tracks['total'] / 100))).map((x, i) => {
                return { href: tracks['href'], offset: i * 100 }
              })
            ),
            mergeMap(
              tracks => this.getData(this.urlPlaylistTracks(tracks['href'], tracks['offset'])),
              null,
              4
            ),
            map(data =>
              Object.values(data['items'])
                .filter(item => !!item['track'])
                .map(item => this.mapTrack(item['track']))
            )
          ),
        null,
        4
      )
    )
  }

  /**
   * helper to load a set of users playlists
   * @param offset
   */
  loadPlaylists(offset): Observable<any> {
    return this.store.select(fromStore.selectProfile).pipe(
      first(),
      switchMap(profile => this.getData(this.urlPlaylist(profile.id, offset)))
    )
  }

  /**
   * helper for simple request
   * @param url
   */
  getData(url) {
    return this.http.get(url).pipe(
      retryWhen(errors =>
        errors.pipe(
          delay(1000),
          tap(error => {
            if (error.status !== 429) {
              throw error
            }
          })
        )
      ),
      first(),
      catchError(() => empty())
    )
  }

  /**
   * helper to map response to track-object
   * @param data
   */
  mapTrack(data): Track {
    const { album, available_markets, external_urls, external_ids, explicit, ...track } = data
    return { ...track, images: album.images }
  }
}
