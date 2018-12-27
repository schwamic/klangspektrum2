import { Component, Input, Output, EventEmitter } from '@angular/core'
import { range } from 'rxjs'

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  @Input() disabled = false
  public range = [0, 1]

  onChange(newRange) {
    this.range = newRange
  }
}
