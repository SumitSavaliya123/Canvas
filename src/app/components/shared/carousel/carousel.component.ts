import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  slides: string[];
  i: number;

  constructor() {
    this.i = 0;
    this.slides = [
      '/assets/images/Animal-welfare-&-save-birds-campaign.png',
      '/assets/images/CSR-initiative-stands-for-Coffee--and-Farmer-Equity-1.png',
      '/assets/images/Education-Supplies-for-Every--Pair-of-Shoes-Sold-2.png',
      '/assets/images/Grow-Trees-On-the-path-to-environment-sustainability-1.png',
    ];
  }

  getSlide() {
    return this.slides[this.i];
  }

  getPrev() {
    this.i === 0 ? (this.i = this.slides.length - 1) : this.i--;
  }

  getNext() {
    this.i < this.slides.length - 1 ? this.i++ : (this.i = 0);
  }
}
