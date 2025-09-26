import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);

  cartCount: BehaviorSubject<number> = new BehaviorSubject(0);

  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'cart', {
      productId: id,
    });
  }

  getProductToCart(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'cart');
  }

  removeSpecificCartItem(id: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `cart/${id}`);
  }

  updateCartCount(id: string, count: number): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `cart/${id}`, {
      count: count,
    });
  }

  checkoutSession(id: string | null, data: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl +
        `orders/checkout-session/${id}?url=https://e-commerce-website-nine-mocha.vercel.app`,
      data
    );
  }

  cashOrder(id: string | null, data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `orders/${id}`, data);
  }
}
