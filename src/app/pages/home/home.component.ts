import { Component } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';
import { MainSliderComponent } from './main-slider/main-slider.component';
import { PopularCategoriesComponent } from './popular-categories/popular-categories.component';
import { PopularProductsComponent } from './popular-products/popular-products.component';

@Component({
  selector: 'app-home',
  imports: [
    CardComponent,
    MainSliderComponent,
    PopularCategoriesComponent,
    PopularProductsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
