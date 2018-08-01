import { Component, OnInit } from '@angular/core';
import {ApiService} from '@app/core/services/api.service'

@Component({
  selector: 'ks-landing-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  login(){
    this.api.login()
  }
}
