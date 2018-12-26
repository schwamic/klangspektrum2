import { Component } from '@angular/core'

@Component({
  selector: 'ks-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent {
  chartOptions = {
    responsive: true
  }

  chartData = [
    { data: [330, 600, 260, 700], label: 'All' },
    { data: [120, 455, 100, 340], label: 'Selection' },
  ]

  chartLabels = ['January', 'February', 'Mars', 'April']

  onChartClick(event) {
    console.log(event)
  }
}
