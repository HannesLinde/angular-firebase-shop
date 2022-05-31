import { AppState } from '@app/store/reducers/app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from '../reducers/orders.reducer';

export interface State extends AppState {
  orders: OrderState;
}

const getOrdersFeatures = createFeatureSelector<OrderState>('orders');

export const getOrders = createSelector(getOrdersFeatures, (state) => state.orders);

export const getShoppingCartOrder = createSelector(getOrdersFeatures, (state) => state.order);
