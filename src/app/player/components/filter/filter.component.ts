import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { debounceTime, tap, distinctUntilChanged, filter, take } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { Store, select } from '@ngrx/store'
import * as fromStore from '@app/core/store'
import { UpdateFilter } from '@app/core/store/filter.actions'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  destroy = new Subject()
  filterForm: FormGroup = this.fb.group({
    accousticness: null,
    danceability: null,
    energy: null,
    instrumentalness: null,
    liveness: null,
    speechiness: null,
    valence: null
  })

  constructor(private fb: FormBuilder, private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.store
      .pipe(
        select(fromStore.selectFilter),
        take(1)
      )
      .subscribe(f => {
        this.filterForm.controls['accousticness'].setValue(f.accousticness, { onlySelf: true })
        this.filterForm.controls['danceability'].setValue(f.danceability, { onlySelf: true })
        this.filterForm.controls['energy'].setValue(f.energy, { onlySelf: true })
        this.filterForm.controls['instrumentalness'].setValue(f.instrumentalness, {
          onlySelf: true
        })
        this.filterForm.controls['liveness'].setValue(f.liveness, { onlySelf: true })
        this.filterForm.controls['speechiness'].setValue(f.speechiness, { onlySelf: true })
        this.filterForm.controls['valence'].setValue(f.valence, { onlySelf: true })
      })
    this.filterForm.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(150)
      )
      .subscribe(form => {
        this.store.dispatch(new UpdateFilter({ ...form }))
      })
  }

  ngOnDestroy() {
    this.destroy.next(true)
  }
}
