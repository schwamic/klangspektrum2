import { Component } from '@angular/core'
import { StateService } from './core/services/state.service'

@Component({
  selector: 'app-root',
  template: `
    <p *ngIf="loading$ | async" style="margin: 40px 32px;">Loading...</p>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  loading$ = this.stateService.getLoadingState()
  constructor(private stateService: StateService) {}
}
