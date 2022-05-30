import { Order } from '@app/orders/models/order.model';
import { createAction, props } from '@ngrx/store';

export const loadAllOrders = createAction('[Orders Page] Load All Orders');
