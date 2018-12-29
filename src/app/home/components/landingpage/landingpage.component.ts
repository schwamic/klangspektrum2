import { Component } from '@angular/core'
import { ApiService } from '@app/core/services/api.service'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent {
  constructor(private api: ApiService) {}

  login() {
    this.api.login()
  }
}
