import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'range'
})
export class RangePipe implements PipeTransform {
  transform(value: any): string {
    return value
      .map(item => {
        if (item !== 1 && item !== 0) {
          return item.toString().length > 3 ? item.toString() : `${item.toString()}0`
        } else {
          return item.toString()
        }
      })
      .toString()
      .replace(/,/g, '—')
  }
}
