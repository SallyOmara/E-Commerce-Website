import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../core/models/product.interface';
import { ProductsService } from '../../core/services/products/products.service';
import { CardComponent } from '../../shared/card/card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  imports: [CardComponent, NgxPaginationModule, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  productList: Product[] = [];
  pageSize!: number;
  p!: number;
  total!: number;
  text: string = '';
  private readonly productsService = inject(ProductsService);
  private readonly ngxSpinnerService = inject(NgxSpinnerService);

  ngOnInit(): void {
    this.getAllProductsData();
  }

  getAllProductsData(pageNum: number = 1) {
    this.productsService.getAllProducts(pageNum).subscribe({
      next: (res) => {
        this.productList = res.data;
        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
