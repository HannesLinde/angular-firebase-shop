import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from '@app/login/auth-guard.guard';
import { ProductResolverService } from './product-resolver.resolve';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { ProductsGridComponent } from './products-grid/products-grid.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  { path: 'add', component: ProductsEditComponent, canActivate: [AuthGuardGuard] },
  {
    path: 'edit/:id',
    component: ProductsEditComponent,
    canActivate: [AuthGuardGuard],
    resolve: { entity: ProductResolverService },
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {
  static components = [ProductsComponent, ProductsListComponent, ProductsEditComponent, ProductsGridComponent];
}
