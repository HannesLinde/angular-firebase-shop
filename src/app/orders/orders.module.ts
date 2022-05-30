import { NgModule } from '@angular/core';
import { OrdersRoutingModule } from './orders-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { OrdersService } from './orders.service';
import { OrderAdapter } from './models/order-adapter';

@NgModule({
  declarations: [OrdersRoutingModule.components],
  imports: [OrdersRoutingModule, SharedModule],
  providers: [OrdersService, OrderAdapter],
})
export class OrdersModule {}
