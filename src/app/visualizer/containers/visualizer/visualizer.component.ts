import { Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import * as fromRoot from '@app/core/store'
import { map } from 'rxjs/operators'
import { Chart } from 'chart.js'
import { chartsData } from './charts-data'

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements OnInit {
  // Default chart data
  charts = chartsData

  // Chart options
  chartOptions = {
    responsive: true
  }

  // Chart labels - must fit with chartData
  chartLabels = [
    '0 - 0.1',
    '0.1 - 0.2',
    '0.2 - 0.3',
    '0.3 - 0.4',
    '0.4 - 0.5',
    '0.5 - 0.6',
    '0.6 - 0.7',
    '0.7 - 0.8',
    '0.8 - 0.9',
    '0.9 - 1'
  ]
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    // Update Font
    Chart.defaults.global.defaultFontFamily = 'Roboto'
    Chart.defaults.global.defaultFontColor = '#000'

    // Map features-data for charts
    this.store
      .pipe(
        select(fromRoot.selectFeatures),
        map(features => {
          Object.entries(features.entities).forEach(entity => {
            this.increment(this.charts[0].chartData[0].data, this.getIndex(entity[1].acousticness))
            this.increment(this.charts[1].chartData[0].data, this.getIndex(entity[1].danceability))
            this.increment(this.charts[2].chartData[0].data, this.getIndex(entity[1].energy))
            this.increment(
              this.charts[3].chartData[0].data,
              this.getIndex(entity[1].instrumentalness)
            )
            this.increment(this.charts[4].chartData[0].data, this.getIndex(entity[1].liveness))
            this.increment(this.charts[5].chartData[0].data, this.getIndex(entity[1].speechiness))
            this.increment(this.charts[6].chartData[0].data, this.getIndex(entity[1].valence))
          })
        })
      )
      .subscribe()
  }

  /**
   * helper to calculate index
   * @param number
   */
  getIndex(number) {
    const index = Math.trunc(number * 10)
    return index < 10 && index >= 0 ? index : index < 0 ? 0 : 9
  }

  /**
   * helper to increment
   * @param number
   */
  increment(data, index): void {
    if (!!data[index] || data[index] === 0) {
      data[index] += 1
    }
  }
}
