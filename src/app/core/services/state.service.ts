import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { startWith } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private loading = new Subject<boolean>()
  private error = new Subject<boolean>()

  updateLoading(state: boolean) {
    this.loading.next(state)
  }

  updateError(state: boolean) {
    this.error.next(state)
  }

  getLoadingState() {
    return this.loading.asObservable().pipe(startWith(false))
  }

  getErrorState() {
    return this.error.asObservable().pipe(startWith(false))
  }
}
