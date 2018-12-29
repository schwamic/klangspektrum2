import { Component, OnInit, ViewChild } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { selectFilteredTracks } from '../../../core/store/index'
import * as fromRoot from '../../../core/store'
import { MatPaginator, MatTableDataSource } from '@angular/material'
import { SelectionModel } from '@angular/cdk/collections'

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator
  dataSource
  selection = new SelectionModel(true, [])

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.pipe(select(selectFilteredTracks)).subscribe(tracks => {
      this.dataSource = new MatTableDataSource(tracks)
      this.dataSource.paginator = this.paginator
    })
  }

  /**
   * Select item in table
   * @param row
   */
  select(row) {
    this.selection.clear()
    this.selection.select(row)
  }
}
