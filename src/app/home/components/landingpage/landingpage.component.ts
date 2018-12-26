import { Component, OnInit } from '@angular/core'
import { ApiService } from '@app/core/services/api.service'

@Component({
  selector: 'ks-landing-page',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {

  constructor(private api: ApiService) {
  }

  ngOnInit() {
  }

  login() {
    this.api.login()
  }
}
