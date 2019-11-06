import * as chunk from 'lodash/chunk';
import * as flatten from 'lodash/flatten';
import * as fromStore from '../store';
import * as join from 'lodash/join';
import * as qs from 'qs';
import * as uuid from 'uuid';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Track } from '@app/shared/models/track.model';
import { TrackService } from '@app/core/services/track.service';
import { environment } from '@env/environment';
import { Observable, forkJoin, from, throwError, empty } from 'rxjs';
import { catchError, first, map, mergeMap, scan, switchMap, tap, retryWhen, retry, delay } from 'rxjs/operators';

// TODO
// + error-handling + types

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	constructor(private http: HttpClient, private trackService: TrackService, private store: Store<fromStore.State>) {}

	login(showDialog = true): void {
		const state = uuid();
		localStorage.setItem('xsrf-token', state);
		const params = {
			response_type: 'token',
			client_id: environment.clientId,
			redirect_uri: environment.redirectUri,
			scope:
				'streaming user-read-private user-read-birthdate user-read-email playlist-read-private playlist-read-collaborative user-library-read user-top-read',
			state,
			show_dialog: `${showDialog}`
		};
		const redirectUrl = `https://accounts.spotify.com/authorize?${qs.stringify(params)}`;
		window.location.href = redirectUrl;
	}

	profile(): Observable<any> {
		return this.http.get('https://api.spotify.com/v1/me').pipe(retry(3), catchError((error) => throwError(error)));
	}

	tracks(): Observable<Track[]> {
		return this.trackService.getAllTracks().pipe(catchError((error) => throwError(error)));
	}

	features(): Observable<any> {
		return forkJoin(
			this.store
				.select(fromStore.selectTrack)
				.pipe(
					first(),
					switchMap((tracks) =>
						from(chunk(tracks.ids, 100)).pipe(
							mergeMap(
								(trackIds) =>
									this.getData(
										`https://api.spotify.com/v1/audio-features?ids=${join(trackIds, ',')}`
									),
								null,
								4
							),
							scan((acc, features) => [ ...acc, ...(features as Array<any>) ], [])
						)
					)
				)
		).pipe(map((features) => flatten(features[0].map((a) => a.audio_features)).filter((feature) => !!feature)));
	}

	/**
   * helper for simple request
   * @param url
   */
	getData(url) {
		return this.http.get(url).pipe(
			retryWhen((errors) =>
				errors.pipe(
					delay(1000),
					tap((error) => {
						if (error.status !== 429) {
							throw error;
						}
					})
				)
			),
			first(),
			catchError((error) => {
				/* tslint:disable no-console */
				console.log('hanlde error', error);
				return empty();
			})
		);
	}
}
