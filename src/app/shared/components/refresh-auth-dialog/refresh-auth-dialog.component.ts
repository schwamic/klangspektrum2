import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Store, select } from '@ngrx/store'
import * as fromCore from '@app/core/store'
import { ApiService } from '@app/core/services/api.service'

@Component({
  selector: 'app-refresh-auth-dialog',
  templateUrl: './refresh-auth-dialog.component.html',
  styleUrls: ['./refresh-auth-dialog.component.scss']
})
export class RefreshAuthDialogComponent {
  profile$ = this.store.pipe(select(fromCore.selectProfile))
  constructor(
    private api: ApiService,
    private store: Store<fromCore.State>,
    public dialogRef: MatDialogRef<RefreshAuthDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  refresh() {
    this.api.login(false)
  }
}
