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

export const loadShoppingCartSuccess = createAction(
  '[Orders API] Load Shopping Cart Success',
  props<{ order: Order | undefined }>()
);

export const loadShoppingCartFailure = createAction(
  '[Orders API] Load Shopping Cart Failure',
  props<{ error: string }>()
);

export const updateShoppingCartSuccess = createAction(
  '[Orders API] Update Shopping Cart Success',
  props<{ order: Order | undefined }>()
);

export const updateShoppingCartFailure = createAction(
  '[Orders API] Update Shopping Cart Failure',
  props<{ error: string }>()
);
