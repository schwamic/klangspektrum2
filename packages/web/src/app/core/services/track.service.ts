import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Store} from "@ngrx/store"
import * as fromStore from '@app/core/store'
import {combineLatest, forkJoin, from, merge, Observable, of, throwError} from "rxjs";
import {catchError, mergeMap, map, switchMap, take, first, retry, scan} from "rxjs/operators";
import {Track} from "@app/shared/models/track.model"

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  urlMe = (offset) => `https://api.spotify.com/v1/me/tracks?limit=50&offset=${offset}`
  urlPlaylist = (user_id, offset) => `https://api.spotify.com/v1/users/${user_id}/playlists?limit=50&offset=${offset}`
  urlPlaylistTracks = (href, offset) => `${href}?limit=100&offset=${offset}`

  constructor(private http: HttpClient, private store: Store<fromStore.State>) {
  }

  // INFO: Store has no duplicates because ids from spotify are used in ngrx-adapter
  // https://stackoverflow.com/questions/43027201/is-there-a-way-to-manage-concurrency-with-rxjs
  // + mergeMap(concurrently:number) or merge(concurrently:number)
  // + forkJoin() is like Promise.all()

  // TODO
  // + in new ecma release-> save navigator available
  // + use pluck, mapTo and optimize logic
  // + load features
  // + load artists -> only because of genres -> load lazy during viz is running


  getAllTracks(): Observable<any> {
    return forkJoin(
      merge(this.getPlaylistTracks(), this.getSavedTracks())
        .pipe(scan((pTracks, sTracks) => [...pTracks, ...sTracks], []),)
    ).pipe(map(tracks => tracks[0]))
  }

  getSavedTracks(): Observable<Track[]> {
    return this.getData(this.urlMe(0)).pipe(
      take(1),
      switchMap(res => {
          if (res['total'] > 50) {
            return from(Array.apply(null, Array(Math.ceil(res['total'] / 50))).map((x, i) => {
              return i * 50
            })).pipe(
              mergeMap(offset => this.getData(this.urlMe(offset)), null, 10),
              map(res => Object.values(res['items']).map(item => this.mapTrack(item['track']))),
              take(Math.ceil(res['total'] / 50))
            )
          } else {
            return of(res).pipe(
              map(res => Object.values(res['items']).map(item => this.mapTrack(item['track']))),
              first()
            )
          }
        }
      )
    )
  }

  loadPlaylists(offset): Observable<any> {
    return this.store.select(fromStore.selectProfile).pipe(
      take(1),
      switchMap(profile => this.getData(this.urlPlaylist(profile.id, offset))
      )
    )
  }

  getPlaylists(): Observable<any> {
    return this.loadPlaylists(0).pipe(
      take(1),
      switchMap(res => {
          if (res.total > 50) {
            return from(Array.apply(null, Array(Math.ceil(res.total / 50))).map((x, i) => {
              return i * 50
            })).pipe(
              mergeMap(offset => this.loadPlaylists(offset), null, 10),
              map(res => Object.values(res.items).map(item => item['tracks'])),
              take(Math.ceil(res.total / 50))
            )
          } else {
            return of(res).pipe(
              map(res => Object.values(res.items).map(item => item['tracks'])),
              first()
            )
          }
        }
      )
    )
  }

  loadPlaylistTracks(playlist) {
    return from(playlist).pipe(
      mergeMap(tracks => Array.apply(null, Array(Math.ceil(tracks['total'] / 100))).map((x, i) => {
        return {href: tracks['href'], offset: i * 100}
      })),
      mergeMap(tracks => this.getData(this.urlPlaylistTracks(tracks['href'], tracks['offset'])), null, 10
      ),
      map(res => Object.values(res['items']).map(item => this.mapTrack(item['track'])))
    )
  }

  getPlaylistTracks() {
    // todo bug if only use getPlaylists()
    return combineLatest(this.store.select(fromStore.selectAccessToken).pipe(first()), this.getPlaylists(), (token, playlist) => {
      return {token, playlist}
    }).pipe(
      first(),
      mergeMap(({token, playlist}) => this.loadPlaylistTracks(playlist)),
    )
  }

  /**
   * helper to map response to track-object
   * @param data
   */
  mapTrack(data): Track {
    const {album, available_markets, external_urls, external_ids, explicit, ...track} = data
    return track
  }

  /**
   * helper for simple request
   * @param url
   */
  getData(url) {
    return this.http
      .get(url)
      .pipe(
        retry(3),
        first(),
        catchError(error => throwError(error))
      )
  }
}
