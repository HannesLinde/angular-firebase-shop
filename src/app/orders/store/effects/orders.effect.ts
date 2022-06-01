import { Injectable } from '@angular/core';
import { UserState } from '@app/login/store/reducers/login.reducer';
import { getAuthentification } from '@app/login/store/selectors/login.selector';
import { Order } from '@app/orders/models/order.model';
import { OrdersService } from '@app/orders/orders.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, mergeMap, map, of, withLatestFrom, from } from 'rxjs';
import { OrderApiActions, OrderPageActions } from '../actions';
import { OrderState } from '../reducers/orders.reducer';
import { getShoppingCartOrder } from '../selectors/orders.selector';

@Injectable()
export class OrderEffect {
  constructor(
    private actions$: Actions,
    private orderService: OrdersService,
    private orderStore: Store<OrderState>,
    private userStore: Store<UserState>
  ) {}

  allOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderPageActions.loadAllOrders),
      mergeMap(() =>
        this.orderService.getAll().pipe(
          map((orders) => OrderApiActions.loadAllOrdersSuccess({ orders })),
          catchError((error) => of(OrderApiActions.loadAllOrdersFailure({ error })))
        )
      )
    );
  });

  addProductToShoppingCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderPageActions.addProductToCart),
      withLatestFrom(this.orderStore.select(getShoppingCartOrder), this.userStore.select(getAuthentification)),
      mergeMap(([{ detail }, order, user]) => {
        if (order) {
          order.details.push(detail);
          return from(this.orderService.update(order.id, order)).pipe(
            map(() => OrderApiActions.addProductToCartSuccess({ order })),
            catchError((error) => of(OrderApiActions.addProductToCartFailure({ error })))
          );
        } else {
          const order = new Order('', 50, new Date(), 'NOT SUBMITTED', [], user?.uid || '');
          return from(this.orderService.add(order)).pipe(
            map((id) => OrderApiActions.addProductToCartSuccess({ order })),
            catchError((error) => of(OrderApiActions.addProductToCartFailure({ error })))
          );
        }
      })
    );
  });
}
