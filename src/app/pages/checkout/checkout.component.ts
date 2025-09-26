import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  checkoutForm!: FormGroup;
  isLoading: boolean = false;
  id: string | null = null;
  flag: boolean = false;

  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParam) => {
        this.id = urlParam.get('id');
      },
    });
  }

  initForm(): void {
    this.checkoutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [
          null,
          [Validators.required, Validators.pattern(/^01[0125]\d{8}$/)],
        ],
        city: [null, [Validators.required]],
      }),
    });
  }

  submitForm(): void {
    if (this.checkoutForm.valid) {
      if (this.flag) {
        this.cartService
          .checkoutSession(this.id, this.checkoutForm.value)
          .subscribe({
            next: (res) => {
              if (res.status === 'success') {
                //Open URL stripe - res.session.url
                window.open(res.session.url, '_self');
              }
            },
            error: (err) => {
              console.log(err);
            },
          });
      } else {
        console.log('hello');

        this.cartService.cashOrder(this.id, this.checkoutForm.value).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
  }
}
