import { RouterLink } from '@angular/router';
import { Product } from './../../core/models/product.interface';
import { Component, inject, Input } from '@angular/core';
import { CartService } from '../../pages/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input({ required: true }) product: Product = {} as Product;
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

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
}
