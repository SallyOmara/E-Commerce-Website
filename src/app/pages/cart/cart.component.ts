import { Component, inject, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Cart } from './models/cart.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  cartDetails: Cart = {} as Cart;

  ngOnInit(): void {
    this.getLoggedUserData();
  }

  getLoggedUserData(): void {
    this.cartService.getProductToCart().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        console.log(this.cartDetails._id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeItem(id: string): void {
    this.cartService.removeSpecificCartItem(id).subscribe({
      next: (res) => {
        this.cartService.cartCount.next(res.numOfCartItems);
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateItemCount(id: string, count: number): void {
    this.cartService.updateCartCount(id, count).subscribe({
      next: (res) => {
        this.cartService.cartCount.next(res.numOfCartItems);
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
