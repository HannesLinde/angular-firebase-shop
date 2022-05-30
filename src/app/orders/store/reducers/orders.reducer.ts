import { Order } from '@app/orders/models/order.model';
import { createReducer, on } from '@ngrx/store';
import { OrderApiActions } from '../actions';

export interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

export const orderReducer = createReducer<OrderState>(
  initialState,
  on(OrderApiActions.loadAllOrdersSuccess, (state, { orders }): OrderState => {
    return {
      ...state,
      orders,
    };
  })
);
