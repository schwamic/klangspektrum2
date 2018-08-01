import { Injectable } from '@angular/core'
import {HttpClient, HttpParams} from "@angular/common/http"
import {environment} from "../../../environments/environment"
import * as uuid from 'uuid'
import * as qs from 'qs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  state: string

  constructor(private http: HttpClient) { }

  login(){
    this.state = uuid()
    localStorage.setItem('xsrf-token', this.state)
    const params = {
        response_type: 'token',
        client_id: environment.clientId,
        redirect_uri: environment.redirectUri,
        scope: 'user-read-private user-read-email playlist-read-private playlist-read-collaborative user-library-read user-top-read',
        state: this.state,
        show_dialog: 'true'
    }
    const redirectUrl = `https://accounts.spotify.com/authorize?${qs.stringify(params)}`
    window.location.href = redirectUrl
  }

  // todo add callback -> guard -> load data
  // todo add interceptor to set header
  profile(access_token){
    const options = {
      params: new HttpParams()
        .set('headers', qs.stringify({'Authorization': `Bearer ${access_token}`}))
        .set('json', 'true')
    }
    this.http.get('https://api.spotify.com/v1/me', options)
  }
}
