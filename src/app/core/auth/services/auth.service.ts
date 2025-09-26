import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  registerForm(data: object): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      data
    );
  }

  loginForm(data: object): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      data
    );
  }

  logOut(): void {
    // Remove token
    this.cookieService.delete('token');
    // Navigate to login
    this.router.navigate(['/login']);
  }

  decodeToken() {
    let token;
    try {
      token = jwtDecode<{ id: string; name: string; role: string }>(
        this.cookieService.get('token')
      );
    } catch (error) {
      this.logOut();
    }
    return token;
  }

  submitVerifyEmail(data: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + `auth/forgotPasswords`,
      data
    );
  }

  submitVerifyCode(data: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + `auth/verifyResetCode`,
      data
    );
  }

  submitResetPassword(data: object): Observable<any> {
    return this.httpClient.put(
      environment.baseUrl + `auth/resetPassword`,
      data
    );
  }
}
