import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ApiService} from "@app/core/services/api.service";
import {Store} from "@ngrx/store";
import * as fromCore from '@app/core/store'
import {catchError, filter, switchMap, take, tap} from "rxjs/operators";
import { LoadProfile } from "@app/core/store/profile.actions";

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {
  constructor(private api: ApiService, private store: Store<fromCore.State>){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    // todo add ensureLibraryLoaded + better naming for library/profile...
    return this.ensureProfileLoaded().pipe(
      switchMap(() =>  of(true)),
      catchError(() => of(false))
    )
  }

  ensureProfileLoaded(): Observable<boolean>{
    return this.store.select(fromCore.selectProfileLoaded).pipe(
      tap(loaded => {
        if(!loaded){this.store.dispatch(new LoadProfile())}
      }),
      filter(loaded => loaded),
      take(1)
    )
  }

  // ensureLibraryLoaded(): Observable<boolean>{
  //
  // }
}
