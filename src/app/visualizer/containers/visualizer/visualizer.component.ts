import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements OnInit {
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
  constructor() {}

  ngOnInit() {}
}
