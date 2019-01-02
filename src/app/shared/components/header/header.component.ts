import { Component } from '@angular/core'
import { Router } from '@angular/router'
import * as fromStore from '@app/core/store'
import { Store, select } from '@ngrx/store'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user = this.store.pipe(select(fromStore.selectProfile))

  constructor(
    private store: Store<fromStore.State>,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  logout() {
    window.sessionStorage.clear()
    window.localStorage.clear()
    this.router.navigate(['/home'])
  }

  /**
   * helper to set cover
   */
  setProfileImage(user) {
    if (!!user && !!user.images[0] && !!user.images[0]) {
      return this.sanitizer.bypassSecurityTrustStyle(`url( ${user.images[0].url})`)
    }
  }
}
