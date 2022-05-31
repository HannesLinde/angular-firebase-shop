import { Order, OrderDetail } from '@app/orders/models/order.model';
import { createAction, props } from '@ngrx/store';

export const loadAllOrdersSuccess = createAction('[Orders API] Load All Orders Success', props<{ orders: Order[] }>());

export const loadAllOrdersFailure = createAction('[Orders API] Load All Orders Failure', props<{ error: string }>());

export const addProductToCartSuccess = createAction(
  '[Orders API] Add Product To Cart Success',
  props<{ order: Order }>()
);

export const addProductToCartFailure = createAction(
  '[Orders API] Add Product To Cart Failure',
  props<{ error: string }>()
);
