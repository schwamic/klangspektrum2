import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ApiService} from "@app/core/services/api.service";
import {
  LoadProfile,
  LoadProfileFail,
  LoadProfileSuccess,
  ProfileActionTypes
} from "@app/core/store/profile.actions";
import * as fromCore from '@app/core/store'
import {Store} from "@ngrx/store";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {of} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class ProfileEffects {

  constructor(private actions$: Actions, private api: ApiService, private store: Store<fromCore.State>, private router: Router) {
  }

  @Effect()
  loadProfile$ = this.actions$.pipe(
    ofType<LoadProfile>(ProfileActionTypes.LoadProfile),
    switchMap(() => this.api.profile().pipe(
      map(profile => new LoadProfileSuccess({profile})),
      catchError(error => of(new LoadProfileFail(error)))
    ))
  )


}
