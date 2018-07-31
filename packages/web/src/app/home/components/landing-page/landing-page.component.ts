import { Component, OnInit } from '@angular/core';
import {ApiService} from '@app/core/services/api.service'

@Component({
  selector: 'ks-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  login(){
    this.api.login()
  }
}
