import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "@app/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'product-category',
    loadChildren: () => import('./product-category/product-category.module').then((m) => m.ProductCategoryModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
