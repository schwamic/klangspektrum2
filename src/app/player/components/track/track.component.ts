import { Component, Input } from '@angular/core'
import * as round from 'lodash/round'

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent {
  @Input() track

  roundTo2(value: number): number {
    return round(value, 2)
  }
}
