import { Order } from '@app/orders/models/order.model';
import { createAction, props } from '@ngrx/store';

export const loadAllOrdersSuccess = createAction('[Orders Page] Load All Orders Success', props<{ orders: Order[] }>());

export const loadAllOrdersFailure = createAction('[Orders Page] Load All Orders Failure', props<{ error: string }>());
