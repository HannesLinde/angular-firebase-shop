import { Order, OrderDetail } from '@app/orders/models/order.model';
import { createAction, props } from '@ngrx/store';

export const loadAllOrders = createAction('[Orders Page] Load All Orders');

export const addProductToCart = createAction('[Orders Page] Add Product To Cart', props<{ detail: OrderDetail }>());
