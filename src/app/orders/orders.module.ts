import { NgModule } from '@angular/core';
import { OrdersRoutingModule } from './orders-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { OrdersService } from './orders.service';
import { OrderAdapter } from './models/order-adapter';
import { CommonModule } from '@angular/common';
import { OrderDetailDialogComponent } from './order-detail-dialog/order-detail-dialog.component';

@NgModule({
  declarations: [OrdersRoutingModule.components, OrderDetailDialogComponent],
  imports: [OrdersRoutingModule, SharedModule, CommonModule],
  providers: [OrdersService, OrderAdapter],
})
export class OrdersModule {}
