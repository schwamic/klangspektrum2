import { Injectable } from '@angular/core'
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'
import { empty, Observable, of, throwError } from 'rxjs'
import { Store } from '@ngrx/store'
import * as fromStore from '../store'
import { catchError, first, map, switchMap } from 'rxjs/operators'
import { Router } from '@angular/router'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromStore.State>, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(fromStore.selectAccessToken).pipe(
      first(),
      map(token => req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })),
      switchMap(req =>
        next.handle(req).pipe(
          catchError((err, source) => {
            if (err.status == 401 || err.status == 403) {
              this.router.navigate(['/home', { needsLogin: true }]) //todo: not working -> errorhandling in guards
              return empty()
            } else {
              return throwError(err)
            }
          })
        )
      )
    )
  }
}
