import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { map } from 'rxjs/operators'
import { selectAllTracks } from '../../../core/store/index'
import * as fromRoot from '../../../core/store'

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  pagination = 30

  tracks$ = this.store.select(selectAllTracks).pipe(map(tracks => tracks.slice(0, this.pagination)))
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {}
}
