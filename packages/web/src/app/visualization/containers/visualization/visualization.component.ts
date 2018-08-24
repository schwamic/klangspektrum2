import { Component, OnInit } from '@angular/core';
import { LocalBasketService } from "@app/core/services/local-basket.service";

@Component({
  selector: 'ks-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {

  basket: object = {
    '3': true,
    '5': true
  }

  constructor(private localBasketService: LocalBasketService) { }

  ngOnInit() {
  }

  saveBasket(): void {
    this.localBasketService.save(this.basket).then(
      _ => console.debug('successfully saved basket"'),
      err => console.error('error saving basket', err)
    )
  }

  loadBasket(): void {
    this.localBasketService.load().then(
      basket => this.basket = basket,
      err => console.error('error loading basket', err)
    );
  }

}
