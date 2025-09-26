import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { DetailsComponent } from './pages/details/details.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { CartComponent } from './pages/cart/cart.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth-guard';
import { isLoggedGuard } from './core/guards/is-logged-guard';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AllordersComponent } from './pages/allorders/allorders.component';
import { ForgotpasswordComponent } from './core/auth/forgotpassword/forgotpassword.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [isLoggedGuard],
    children: [
      { path: 'login', component: LoginComponent, title: 'Login Page' },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register Page',
      },
      {
        path: 'forgot',
        component: ForgotpasswordComponent,
        title: 'Forgotten Password',
      },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomeComponent, title: 'Home Page' },
      {
        path: 'products',
        component: ProductsComponent,
        title: 'Products Page',
      },
      { path: 'brands', component: BrandsComponent, title: 'Brands Page' },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories Page',
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Details Page',
      },
      { path: 'contact', component: ContactComponent, title: 'Contact Page' },
      { path: 'about', component: AboutComponent, title: 'About Page' },
      { path: 'cart', component: CartComponent, title: 'Cart Page' },
      {
        path: 'allorders',
        component: AllordersComponent,
        title: 'All Orders Page',
      },
      {
        path: 'checkout/:id',
        component: CheckoutComponent,
        title: 'Checkout Page',
      },
    ],
  },
  { path: '**', component: NotfoundComponent, title: 'Not Found Page' },
];
