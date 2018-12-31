import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { shareReplay } from 'rxjs/operators'
import { Filter } from '@app/shared/models/filter.model'

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private loading = new BehaviorSubject<boolean>(false)
  private error = new BehaviorSubject<boolean>(false)
  private currentTrack = new BehaviorSubject<boolean>(null)
  private filter = new BehaviorSubject<Filter>({
    acousticness: [0, 1],
    danceability: [0, 1],
    energy: [0, 1],
    instrumentalness: [0, 1],
    liveness: [0, 1],
    speechiness: [0, 1],
    valence: [0, 1]
  })

  setLoading(state: boolean) {
    this.loading.next(state)
  }

  setError(state: boolean) {
    this.error.next(state)
  }

  setFilterSettings(filter: Filter) {
    this.filter.next(filter)
  }

  setCurrentTrack(track: any) {
    this.currentTrack.next(track)
  }

  getLoadingState(): Observable<any> {
    return this.loading.asObservable().pipe(shareReplay(1))
  }

  getErrorState(): Observable<any> {
    return this.error.asObservable().pipe(shareReplay(1))
  }

  getFilterSettings(): Observable<any> {
    return this.filter.asObservable().pipe(shareReplay(1))
  }

  getCurrentTrack(): Observable<any> {
    return this.currentTrack.asObservable().pipe(shareReplay(1))
  }
}
