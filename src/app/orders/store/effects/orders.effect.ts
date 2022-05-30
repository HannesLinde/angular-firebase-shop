import { Injectable } from '@angular/core';
import { OrdersService } from '@app/orders/orders.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map, of } from 'rxjs';
import { OrderApiActions, OrderPageActions } from '../actions';

@Injectable()
export class OrderEffect {
  constructor(private actions$: Actions, private orderService: OrdersService) {}

  $allOrders$ = createEffect(() => {
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
}
