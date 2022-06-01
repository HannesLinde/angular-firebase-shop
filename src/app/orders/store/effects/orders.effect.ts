import { Injectable } from '@angular/core';
import { User } from '@app/core/services/user';
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
      withLatestFrom(this.userStore.select(getAuthentification)),
      mergeMap(([action, user]) => {
        if (user)
          return this.getOrders(user).pipe(
            map((orders) => OrderApiActions.loadAllOrdersSuccess({ orders })),
            catchError((error) => of(OrderApiActions.loadAllOrdersFailure({ error })))
          );
        //orders are available only when user auth
        return of(OrderApiActions.loadAllOrdersFailure({ error: 'No User' }));
      })
    );
  });

  addProductToShoppingCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderPageActions.addProductToCart),
      withLatestFrom(this.orderStore.select(getShoppingCartOrder), this.userStore.select(getAuthentification)),
      mergeMap(([{ detail }, order, user]) => {
        if (user)
          if (order) {
            const newOrder = { ...order };
            newOrder.details = [...newOrder.details, detail];
            return from(this.orderService.update(newOrder.id, newOrder)).pipe(
              map(() => OrderApiActions.addProductToCartSuccess({ order: newOrder })),
              catchError((error) => of(OrderApiActions.addProductToCartFailure({ error })))
            );
          } else {
            const newOrder = new Order('', 50, new Date(), 'NOT SUBMITTED', [], user.uid);
            return from(this.orderService.add(newOrder)).pipe(
              map((id) => OrderApiActions.addProductToCartSuccess({ order: newOrder })),
              catchError((error) => of(OrderApiActions.addProductToCartFailure({ error })))
            );
          }
        return of(OrderApiActions.loadAllOrdersFailure({ error: 'No User' }));
      })
    );
  });

  updateShoppingCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderPageActions.updateShoppingCart),
      mergeMap(({ order }) => {
        return from(this.orderService.update(order.id, order)).pipe(
          map(() => OrderApiActions.updateShoppingCartSuccess({ order })),
          catchError((error) => of(OrderApiActions.updateShoppingCartFailure({ error })))
        );
      })
    );
  });

  shoppingCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderPageActions.loadShoppingCart),
      mergeMap(({ ownerId }) =>
        from(this.orderService.getUserShoppingCart(ownerId)).pipe(
          map((order) => OrderApiActions.loadShoppingCartSuccess({ order })),
          catchError((error) => of(OrderApiActions.loadShoppingCartFailure({ error })))
        )
      )
    );
  });

  private getOrders = (user: User) => {
    return user.admin ? from(this.orderService.getAllUsersOrders()) : from(this.orderService.getUserOrders(user.uid));
  };
}
