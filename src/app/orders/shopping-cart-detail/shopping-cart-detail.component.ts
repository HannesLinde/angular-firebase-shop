import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order, OrderDetail } from '../models/order.model';
import { OrderPageActions } from '../store/actions';
import { OrderState } from '../store/reducers/orders.reducer';
import { getShoppingCartOrder } from '../store/selectors/orders.selector';

@Component({
  selector: 'app-shopping-cart-detail',
  templateUrl: './shopping-cart-detail.component.html',
  styleUrls: ['./shopping-cart-detail.component.css'],
})
export class ShoppingCartDetailComponent implements OnInit {
  shoppingOrder$: Observable<Order | undefined>;
  constructor(private orderStore: Store<OrderState>) {
    this.shoppingOrder$ = this.orderStore.select(getShoppingCartOrder);
  }

  ngOnInit(): void {}

  onSave(order: Order) {
    this.orderStore.dispatch(OrderPageActions.updateShoppingCart({ order }));
  }
}
