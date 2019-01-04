import { Component } from '@angular/core'

@Component({
  selector: 'app-profile',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `
})
export class ProfileComponent {}
