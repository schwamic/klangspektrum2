import {Injectable} from '@angular/core'
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'
import {Observable, of} from 'rxjs'
import {ApiService} from '@app/core/services/api.service'
import {Store} from '@ngrx/store'
import * as fromCore from '@app/core/store'
import {catchError, filter, first, map, switchMap, tap} from 'rxjs/operators'
import {LoadProfile} from '@app/core/store/profile.actions'
import {LoadTrack} from '@app/core/store/track.actions'

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {
  constructor(private api: ApiService, private store: Store<fromCore.State>) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.ensureProfileLoaded().pipe(
      switchMap(() => this.ensureTracksLoaded().pipe(map(() => true))),
      catchError(() => of(false))
    )
  }

  ensureProfileLoaded(): Observable<boolean> {
    return this.store.select(fromCore.selectProfileLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new LoadProfile())
        }
      }),
      filter(loaded => loaded),
      first()
    )
  }

  ensureTracksLoaded(): Observable<boolean> {
    return this.store.select(fromCore.selectTrackLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new LoadTrack())
        }
      }),
      filter(loaded => loaded),
      first()
    )
  }

  // todo
  ensureFeaturesLoaded(): Observable<boolean> {
    return of(true)
  }
}
