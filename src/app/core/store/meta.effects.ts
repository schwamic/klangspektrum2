import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { AddMeta, MetaActionTypes } from '@app/core/store/meta.actions'
import { switchMap, map, tap } from 'rxjs/operators'
import { timer } from 'rxjs'
import { RefreshAuthDialogComponent } from '@app/shared/components/refresh-auth-dialog/refresh-auth-dialog.component'
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class MetaInfoEffects {
  constructor(private actions$: Actions, private dialog: MatDialog) {}

  @Effect({
    dispatch: false
  })
  refreshAuth$ = this.actions$.pipe(
    ofType<AddMeta>(MetaActionTypes.AddMeta),
    map(data => data.payload.expires_in),
    switchMap(time => {
      return timer(parseInt(time, 10) * 1000).pipe(
        tap(() => {
          this.dialog.open(RefreshAuthDialogComponent, {
            width: '450px'
          })
        })
      )
    })
  )
}
