import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../shared/input/input.component';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css',
})
export class ForgotpasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  msgError: string = '';

  step: number = 1;

  ngOnInit(): void {
    this.initForm();
  }

  verifyEmail!: FormGroup;
  verifyCode!: FormGroup;
  resetPassword!: FormGroup;

  initForm(): void {
    this.verifyEmail = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });

    this.verifyCode = this.fb.group({
      resetCode: [null, [Validators.required]],
    });

    this.resetPassword = this.fb.group({
      email: [null, [Validators.required]],
      newPassword: [
        null,
        [Validators.required, Validators.pattern(/^\w{6,}$/)],
      ],
    });
  }

  verifyFirstStep(): void {
    if (this.verifyEmail.valid) {
      this.authService.submitVerifyEmail(this.verifyEmail.value).subscribe({
        next: (res) => {
          this.msgError = '';
          this.step = 2;
        },
        error: (err) => {
          this.msgError = err.error.message;
        },
      });
    }
  }

  verifySecondStep(): void {
    if (this.verifyCode.valid) {
      this.authService.submitVerifyCode(this.verifyCode.value).subscribe({
        next: (res) => {
          this.msgError = '';
          this.step = 3;
        },
        error: (err) => {
          this.msgError = err.error.message;
        },
      });
    }
  }

  verifyThirdStep(): void {
    if (this.resetPassword.valid) {
      this.authService.submitResetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          this.cookieService.set('token', res.token);
          // navigate to home
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.msgError = err.error.message;
        },
      });
    }
  }
}
