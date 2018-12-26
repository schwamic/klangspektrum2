import * as fromRoot from '../../../core/store'

import { Component, OnInit } from '@angular/core'

import { Store } from '@ngrx/store'
import { map } from 'rxjs/operators';
import { selectAllTracks } from '../../../core/store/index'

@Component({
  selector: 'ks-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  pagination = 10

  tracks$ = this.store.select(selectAllTracks).pipe(map(tracks => tracks.slice(0, this.pagination)))
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {}
}
