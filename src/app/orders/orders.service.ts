import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { Adapter } from '@app/core/adapter';
import { FireBaseFacade } from '@app/core/firebase-facade';
import { OrderAdapter } from './models/order-adapter';
import { OrderDto } from './models/order.dto';
import { Order } from './models/order.model';

const COLLECTION = 'orders';

@Injectable()
export class OrdersService extends FireBaseFacade<Order, OrderDto> {
  constructor(private firestore: Firestore, private ordersAdapter: OrderAdapter) {
    super(COLLECTION);
  }

  getFirestore(): Firestore {
    return this.firestore;
  }
  getAdapter(): Adapter<Order, OrderDto> {
    return this.ordersAdapter;
  }

  async getAllUsersOrders() {
    const ref = collection(this.firestore, COLLECTION);
    const querySnapshot = await getDocs(query(ref, where('status', '!=', 'NOT SUBMITTED')));
    return querySnapshot.docs.map((doc) => doc.data() as unknown as Order);
  }

  async getUserOrders(ownerId: string): Promise<Order[]> {
    const ref = collection(this.firestore, COLLECTION);
    const querySnapshot = await getDocs(
      query(ref, where('ownerId', '==', ownerId)) //, where('status', '!=', 'NOT SUBMITTED') issue firebase precondition
    );
    return querySnapshot.docs.length > 0
      ? querySnapshot.docs
          .filter((doc) => doc.data()['status'] !== 'NOT SUBMITTED')
          .map((doc) => {
            const order = doc.data() as unknown as Order;
            order.id = doc.id;
            return order;
          })
      : [];
  }

  // shopping cart is an not submitted order, at least only one exist
  async getUserShoppingCart(ownerId: string): Promise<Order | undefined> {
    const ref = collection(this.firestore, COLLECTION);
    const querySnapshot = await getDocs(
      query(ref, where('ownerId', '==', ownerId), where('status', '==', 'NOT SUBMITTED'))
    );
    return querySnapshot.docs.length > 0
      ? ({ id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as Order)
      : undefined;
  }
}
