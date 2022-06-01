import { NgModule } from '@angular/core';
import { OrdersRoutingModule } from './orders-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { OrdersService } from './orders.service';
import { OrderAdapter } from './models/order-adapter';
import { CommonModule } from '@angular/common';
import { OrderDetailDialogComponent } from './order-detail-dialog/order-detail-dialog.component';
import { StoreModule } from '@ngrx/store';
import { orderReducer } from './store/reducers/orders.reducer';
import { EffectsModule } from '@ngrx/effects';
import { OrderEffect } from './store/effects/orders.effect';
import { AddToCartDialogComponent } from './add-to-cart-dialog/add-to-cart-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { orderTotalPipe } from './order-total.pipe';
@NgModule({
  declarations: [OrdersRoutingModule.components, OrderDetailDialogComponent, AddToCartDialogComponent, orderTotalPipe],
  imports: [
    OrdersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
    StoreModule.forFeature('orders', orderReducer),
    EffectsModule.forFeature([OrderEffect]),
  ],
  providers: [OrdersService, OrderAdapter],
})
export class OrdersModule {}
