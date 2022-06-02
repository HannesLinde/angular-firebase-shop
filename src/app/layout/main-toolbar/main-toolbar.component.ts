import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { User } from '@app/core/services/user';
import { LoginPageActions } from '@app/login/store/actions';
import { UserState } from '@app/login/store/reducers/login.reducer';
import { getAuthentification } from '@app/login/store/selectors/login.selector';
import { Order } from '@app/orders/models/order.model';
import { OrderPageActions } from '@app/orders/store/actions';
import { OrderState } from '@app/orders/store/reducers/orders.reducer';
import { getShoppingCartOrder } from '@app/orders/store/selectors/orders.selector';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css'],
})
export class MainToolbarComponent implements OnInit, OnDestroy {
  @Output() toggleSideNave = new EventEmitter<void>();
  user$?: Observable<User | null>;
  shoppingOrder$?: Observable<Order | undefined>;
  subscriptions = new Subscription();
  constructor(private userStore: Store<UserState>, private orderStore: Store<OrderState>) {}

  ngOnInit(): void {
    this.user$ = this.userStore.select(getAuthentification);
    this.shoppingOrder$ = this.userStore.select(getShoppingCartOrder);
    this.subscriptions.add(
      this.user$.subscribe((user) => {
        if (user) this.orderStore.dispatch(OrderPageActions.loadShoppingCart({ ownerId: user.uid }));
      })
    );
  }

  toggle(event: any) {
    this.toggleSideNave.emit();
  }

  logOut() {
    this.userStore.dispatch(LoginPageActions.logOut());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
