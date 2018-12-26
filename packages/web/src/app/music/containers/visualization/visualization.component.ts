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

  chartData = [{ data: [330, 600, 260, 700, 330, 600, 260, 700, 30, 400], label: 'All' }]

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
}
