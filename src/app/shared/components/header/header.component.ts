import { Component } from '@angular/core'
import { Router } from '@angular/router'
import * as fromStore from '@app/core/store'
import { Store, select } from '@ngrx/store'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user = this.store.pipe(select(fromStore.selectProfile))

  constructor(private store: Store<fromStore.State>, private router: Router) {}

  logout() {
    window.sessionStorage.clear()
    window.localStorage.clear()
    this.router.navigate(['/home'])
  }
}
