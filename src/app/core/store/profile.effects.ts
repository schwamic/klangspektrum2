import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { ApiService } from '@app/core/services/api.service'
import {
  LoadProfile,
  LoadProfileFail,
  LoadProfileSuccess,
  ProfileActionTypes
} from '@app/core/store/profile.actions'
import { catchError, map, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

@Injectable()
export class ProfileEffects {
  constructor(private actions$: Actions, private api: ApiService) {}

  @Effect()
  loadProfile$ = this.actions$.pipe(
    ofType<LoadProfile>(ProfileActionTypes.LoadProfile),
    switchMap(() =>
      this.api.profile().pipe(
        map(profile => new LoadProfileSuccess({ profile })),
        catchError(error => of(new LoadProfileFail(error)))
      )
    )
  )
}
