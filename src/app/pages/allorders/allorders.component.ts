import { Component, inject, OnInit } from '@angular/core';
import { AllordersService } from './services/allorders.service';
import { AuthService } from '../../core/auth/services/auth.service';
import { order } from './models/order.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-allorders',
  imports: [RouterLink],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent implements OnInit {
  private readonly allordersService = inject(AllordersService);
  private readonly authService = inject(AuthService);
  id: string | undefined = undefined;
  orderList!: order[];

  ngOnInit(): void {
    this.getUserId();
    this.getAllOrders();
  }

  getUserId(): void {
    this.id = this.authService.decodeToken()?.id;
  }

  getAllOrders(): void {
    this.allordersService.getAllUserOrder(this.id).subscribe({
      next: (res) => {
        this.orderList = res;
        console.log(this.orderList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
