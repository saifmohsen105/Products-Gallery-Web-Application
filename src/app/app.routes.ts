import { Routes } from '@angular/router';


export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products/products.component').then((m) => m.ProductsComponent),
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('./pages/details/details.component').then((m) => m.DetailsComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/notfound/notfound.component').then((m) => m.NotfoundComponent),
  },
];
