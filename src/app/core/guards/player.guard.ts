import { Observable, combineLatest } from 'rxjs'
import { CanActivate } from '@angular/router'
import { Injectable } from '@angular/core'
import { PlayerService } from '../services/player.service'
import { filter, map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PlayerGuard implements CanActivate {
  constructor(public playerService: PlayerService) {}

  canActivate(): Observable<any> {
    return combineLatest(
      this.playerService.connect(),
      this.playerService.isReady(),
      this.playerService.hasError()
    ).pipe(
      /* tslint:disable no-console */
      tap(([connected, ready, error]) => console.log({ error })), // todo handle-error
      filter(
        ([connected, ready, error]) => !!(!!window['Spotify'] && connected && ready && !error)
      ),
      map(() => true)
    )
  }
}
