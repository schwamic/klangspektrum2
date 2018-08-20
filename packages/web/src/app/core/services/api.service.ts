import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from "@angular/common/http"
import {environment} from "@env/environment"
import * as uuid from 'uuid'
import * as qs from 'qs'
import {concat, forkJoin, merge, Observable, throwError} from "rxjs";
import {catchError, concatAll, map, mergeMap, scan, take, tap, toArray} from "rxjs/operators";
import {TrackService} from "@app/core/services/track.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  state: string

  constructor(private http: HttpClient, private trackService: TrackService) {
  }

  login() {
    this.state = uuid()
    localStorage.setItem('xsrf-token', this.state)
    const params = {
      response_type: 'token',
      client_id: environment.clientId,
      redirect_uri: environment.redirectUri,
      scope: 'user-read-private user-read-birthdate user-read-email playlist-read-private playlist-read-collaborative user-library-read user-top-read',
      state: this.state,
      show_dialog: 'true'
    }
    const redirectUrl = `https://accounts.spotify.com/authorize?${qs.stringify(params)}`
    window.location.href = redirectUrl
  }

  // todo add interceptor to set header
  profile(access_token): Observable<any> {

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${access_token}`)

    return this.http
      .get('https://api.spotify.com/v1/me', {headers})
      .pipe(catchError(error => throwError(error.json())))
  }

  tracks(): Observable<any> {
    this.trackService.getPlaylists().subscribe(r => console.log(r))
    return this.trackService.getAllTracks()
  }

  artists() {

  }
}

