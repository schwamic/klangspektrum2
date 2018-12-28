import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { ApiService } from '@app/core/services/api.service'
import {
  LoadTrack,
  LoadTrackFail,
  LoadTrackSuccess,
  TrackActionTypes
} from '@app/core/store/track.actions'
import { catchError, map, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

@Injectable()
export class TrackEffects {
  constructor(private actions$: Actions, private api: ApiService) {}

  @Effect()
  loadTrack$ = this.actions$.pipe(
    ofType<LoadTrack>(TrackActionTypes.LoadTrack),
    switchMap(() =>
      this.api.tracks().pipe(
        map(tracks => new LoadTrackSuccess({ tracks })),
        catchError(error => of(new LoadTrackFail(error)))
      )
    )
  )
}
