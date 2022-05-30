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

@NgModule({
  declarations: [OrdersRoutingModule.components, OrderDetailDialogComponent],
  imports: [
    OrdersRoutingModule,
    SharedModule,
    CommonModule,
    StoreModule.forFeature('orders', orderReducer),
    EffectsModule.forFeature([OrderEffect]),
  ],
  providers: [OrdersService, OrderAdapter],
})
export class OrdersModule {}
