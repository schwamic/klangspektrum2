import { Component } from '@angular/core'
import { StateService } from './core/services/state.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  loading$ = this.stateService.getLoadingState()
  constructor(private stateService: StateService) {}
}
