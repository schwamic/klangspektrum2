import { Observable, of } from 'rxjs'
import { CanActivate } from '@angular/router'
import { Injectable } from '@angular/core'
import { StateService } from '@app/core/services/state.service'

@Injectable({
  providedIn: 'root'
})
export class DeactivateLoadingGuard implements CanActivate {
  constructor(public stateService: StateService) {}

  canActivate(): Observable<any> {
    this.stateService.setLoading(false)
    return of(true)
  }
}
