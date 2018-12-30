import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { startWith, shareReplay } from 'rxjs/operators'
import { Filter } from '@app/shared/models/filter.model'

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private loading = new Subject<boolean>()
  private error = new Subject<boolean>()
  private filter = new Subject<Filter>()

  setLoading(state: boolean) {
    this.loading.next(state)
  }

  setError(state: boolean) {
    this.error.next(state)
  }

  setFilterSettings(filter: Filter) {
    this.filter.next(filter)
  }

  getLoadingState() {
    return this.loading.asObservable().pipe(
      startWith(false),
      shareReplay(1)
    )
  }

  getErrorState() {
    return this.error.asObservable().pipe(
      startWith(false),
      shareReplay(1)
    )
  }

  getFilterSettings() {
    return this.filter.asObservable().pipe(
      startWith({
        acousticness: [0, 1],
        danceability: [0, 1],
        energy: [0, 1],
        instrumentalness: [0, 1],
        liveness: [0, 1],
        speechiness: [0, 1],
        valence: [0, 1]
      }),
      shareReplay(1)
    )
  }
}
