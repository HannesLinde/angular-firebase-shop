import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Adapter } from '@app/core/adapter';
import { FireBaseFacade } from '@app/core/firebase-facade';
import { OrderAdapter } from './models/order-adapter';
import { OrderDto } from './models/order.dto';
import { Order } from './models/order.model';

@Injectable()
export class OrdersService extends FireBaseFacade<Order, OrderDto> {
  constructor(private fireStore: Firestore, private ordersAdapter: OrderAdapter) {
    super('orders');
  }

  getFirestore(): Firestore {
    return this.fireStore;
  }
  getAdapter(): Adapter<Order, OrderDto> {
    return this.ordersAdapter;
  }
}
