import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {environment} from '@env/environment'
import * as uuid from 'uuid'
import * as qs from 'qs'
import {forkJoin, from, Observable, of, throwError} from 'rxjs'
import {catchError, first, map, mergeMap, scan, switchMap} from 'rxjs/operators'
import {TrackService} from '@app/core/services/track.service'
import {Track} from '@app/shared/models/track.model'
import {Store} from '@ngrx/store'
import * as fromStore from '../store'
import * as chunk from 'lodash/chunk'
import * as flatten from 'lodash/flatten'
import * as join from 'lodash/join'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private trackService: TrackService,
    private store: Store<fromStore.State>) {
  }

  login(): void {
    const state = uuid()
    localStorage.setItem('xsrf-token', state)
    const params = {
      response_type: 'token',
      client_id: environment.clientId,
      redirect_uri: environment.redirectUri,
      scope: 'user-read-private user-read-birthdate user-read-email playlist-read-private playlist-read-collaborative user-library-read user-top-read',
      state: state,
      show_dialog: 'true'
    }
    const redirectUrl = `https://accounts.spotify.com/authorize?${qs.stringify(params)}`
    window.location.href = redirectUrl
  }

  profile(): Observable<any> {
    return this.http
      .get('https://api.spotify.com/v1/me')
      .pipe(catchError(error => throwError(error)))
  }

  tracks(): Observable<Track[]> {
    return this.trackService.getAllTracks().pipe(catchError(error => throwError(error)))
  }

  features(): Observable<any> {
    return forkJoin(this.store.select(fromStore.selectTrack).pipe(
      first(),
      switchMap(tracks => from(chunk(tracks.ids, 100)).pipe(
        mergeMap(chunk => this.http.get(`https://api.spotify.com/v1/audio-features?ids=${join(chunk, ',')}`), null, 10),
        scan((acc, features) => [...acc, ...features], []))
      ))
    ).pipe(
      map(features => flatten(features[0].map(a => a.audio_features)).filter(feature => !!feature)))
  }

  // todo load artists -> only because of genres -> load lazy during viz is running
  artists() {

  }
}

