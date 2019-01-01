import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap } from 'rxjs/operators'
import {
  LoadFeaturesSuccess,
  FeaturesActionTypes,
  LoadFeaturesFail,
  LoadFeatures
} from '@app/core/store/features.actions'
import { ApiService } from '@app/core/services/api.service'
import { of } from 'rxjs'

@Injectable()
export class FeaturesEffects {
  constructor(private actions$: Actions, private api: ApiService) {}

  @Effect()
  loadFeatures = this.actions$.pipe(
    ofType<LoadFeatures>(FeaturesActionTypes.LoadFeatures),
    switchMap(() =>
      this.api.features().pipe(
        map(features => new LoadFeaturesSuccess({ features })),
        catchError(error => of(new LoadFeaturesFail(error)))
      )
    )
  )
}
