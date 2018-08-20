import {Injectable} from '@angular/core'
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http'
import {Observable} from 'rxjs'
import {Store} from "@ngrx/store";
import * as fromStore from "../store"
import {first, map, switchMap} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromStore.State>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(fromStore.selectAccessToken).pipe(
      first(),
      map(token => req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })),
      switchMap(req => next.handle(req))
    )
  }
}
