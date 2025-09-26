import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './services/product-details.service';
import { Product } from '../../core/models/product.interface';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly productDetailsService = inject(ProductDetailsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  productDetails: Product = {} as Product;

  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  id: string | null = null;
  mainImage: string = '';
  currentIndex: number = 0;
  ngOnInit(): void {
    this.getId();
    this.getProductDetailsData();
  }

  addProductItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.cartService.cartCount.next(res.numOfCartItems);
          this.toastrService.success(res.message, 'Shopora');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getProductDetailsData() {
    this.productDetailsService.getDetails(this.id).subscribe({
      next: (res) => {
        this.productDetails = res.data;
        this.mainImage = this.productDetails.images[0];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (URLparams) => {
        this.id = URLparams.get('id');
      },
    });
  }

  changeImg(imageSrc: string) {
    this.mainImage = imageSrc;
  }

  slide(step: number) {
    this.currentIndex += step;
    if (this.currentIndex == -1) {
      this.currentIndex = this.productDetails.images.length - 1;
    } else if (this.currentIndex == this.productDetails.images.length) {
      this.currentIndex = 0;
    }
    this.mainImage = this.productDetails.images[this.currentIndex];
  }
}
