import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true
    }
  ]
})
export class SliderComponent implements ControlValueAccessor {
  range: number[]

  onChange(range) {
    this.range = range
  }

  writeValue(range: any): void {
    this.range = range
  }

  registerOnChange(fn): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {}
  setDisabledState(isDisabled: boolean): void {}
}
