import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { CartService } from '../../pages/cart/services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);

  count!: number;

  ngOnInit(): void {
    this.getCartCount();
  }

  getCartCount(): void {
    this.cartService.cartCount.subscribe({
      next: (value) => {
        this.count = value;
      },
    });
  }

  @Input({ required: true }) isLogin!: boolean;

  signOut(): void {
    this.authService.logOut();
  }
}
