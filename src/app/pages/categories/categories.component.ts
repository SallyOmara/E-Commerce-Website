import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Category } from '../cart/models/cart.interface';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);

  ngOnInit(): void {
    this.getAllCat();
  }
  allCategories: Category[] = [];
  getAllCat(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.allCategories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
