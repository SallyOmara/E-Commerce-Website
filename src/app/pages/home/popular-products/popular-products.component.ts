import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../../shared/card/card.component';
import { Product } from '../../../core/models/product.interface';
import { ProductsService } from '../../../core/services/products/products.service';

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css',
})
export class PopularProductsComponent implements OnInit {
  productList: Product[] = [];
  private readonly productsService = inject(ProductsService);

  ngOnInit(): void {
    this.getAllProductsData();
  }

  getAllProductsData() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
