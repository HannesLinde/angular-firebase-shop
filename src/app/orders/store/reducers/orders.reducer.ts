import { Order } from '@app/orders/models/order.model';
import { createReducer, on } from '@ngrx/store';
import { OrderApiActions } from '../actions';

export interface OrderState {
  orders: Order[];
  order: Order | null;
  error: string;
}

const initialState: OrderState = {
  orders: [],
  order: null,
  error: '',
};

export const orderReducer = createReducer<OrderState>(
  initialState,
  on(OrderApiActions.loadAllOrdersSuccess, (state, { orders }): OrderState => {
    return {
      ...state,
      orders,
      error: '',
    };
  }),
  on(OrderApiActions.loadAllOrdersFailure, (state, { error }): OrderState => {
    return {
      ...state,
      error,
    };
  }),
  on(OrderApiActions.addProductToCartSuccess, (state, { order }): OrderState => {
    return {
      ...state,
      order: { ...order },
      error: '',
    };
  }),
  on(OrderApiActions.addProductToCartFailure, (state, { error }): OrderState => {
    return {
      ...state,
      error,
    };
  })
);
