import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { debounceTime } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { StateService } from '@app/core/services/state.service'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  subscription: Subscription
  filterForm: FormGroup = this.fb.group({
    acousticness: [[0, 1]],
    danceability: [[0, 1]],
    energy: [[0, 1]],
    instrumentalness: [[0, 1]],
    liveness: [[0, 1]],
    speechiness: [[0, 1]],
    valence: [[0, 1]]
  })
  filter$ = this.stateService.getFilterSettings()
  constructor(private fb: FormBuilder, private stateService: StateService) {}

  ngOnInit() {
    this.subscription = this.filterForm.valueChanges.pipe(debounceTime(150)).subscribe(form => {
      this.stateService.setFilterSettings({ ...form })
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
