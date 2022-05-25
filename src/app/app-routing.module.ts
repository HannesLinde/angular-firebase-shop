import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { AuthGuardGuard } from './login/auth-guard.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'product-category',
        loadChildren: () => import('./product-category/product-category.module').then((m) => m.ProductCategoryModule),
        canActivate: [AuthGuardGuard],
      },
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then((m) => m.ProductsModule),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', pathMatch: 'full', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
