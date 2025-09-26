import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from './services/brands.service';
import { Brand } from './models/brand.interface';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);

  ngOnInit(): void {
    this.getOurBrands();
  }
  allBrands: Brand[] = [];
  getOurBrands(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.allBrands = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
