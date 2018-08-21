import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ApiService} from "@app/core/services/api.service";
import {LoadTrack, LoadTrackFail, LoadTrackSuccess, TrackActionTypes} from "@app/core/store/track.actions";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable()
export class TrackEffects {

  constructor(private actions$: Actions, private api: ApiService) {
  }

  @Effect()
  loadTrack$ = this.actions$.pipe(
    ofType<LoadTrack>(TrackActionTypes.LoadTrack),
    switchMap(() => this.api.tracks().pipe(
      map(tracks => new LoadTrackSuccess({tracks})),
      catchError(error => of(new LoadTrackFail(error)))
    ))
  )

  // todo move to feature
  @Effect({dispatch: false})
  loadFeatures = this.actions$.pipe(
    ofType<LoadTrackSuccess>(TrackActionTypes.LoadTrackSuccess),
    switchMap(() => this.api.features().pipe(
      tap(f => console.log(f))
    ))
  )
}
