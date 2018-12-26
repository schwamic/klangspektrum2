import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const minutes = Math.trunc(value / 60000)
    const seconds = Math.trunc(value / 1000 - minutes * 60)
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
  }
}
