import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { ShoppingCartDetailComponent } from './shopping-cart-detail/shopping-cart-detail.component';

const routes: Routes = [
  { path: '', component: OrdersComponent },
  { path: 'shopping', component: ShoppingCartDetailComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {
  static components = [OrderListComponent, OrderDetailComponent, OrdersComponent, ShoppingCartDetailComponent];
}
