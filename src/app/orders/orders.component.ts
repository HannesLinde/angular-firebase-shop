import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AppState } from '@app/store/reducers/app.reducer';
import { getHandSet } from '@app/store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription, tap } from 'rxjs';
import { Order } from './models/order.model';
import { OrderDetailDialogComponent } from './order-detail-dialog/order-detail-dialog.component';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders$!: Observable<Order[]>;
  isHandSet = false;
  selectedOrder!: Order;
  subscription = new Subscription();

  constructor(private orderService: OrdersService, private dialog: MatDialog, private appStore: Store<AppState>) {}

  ngOnInit(): void {
    this.orders$ = this.orderService.getAll();
    this.subscription.add(this.appStore.select(getHandSet).subscribe((isHandSet) => (this.isHandSet = isHandSet)));
  }

  onOrderSelected(order: Order) {
    this.selectedOrder = order;
    if (this.isHandSet)
      this.dialog.open(OrderDetailDialogComponent, {
        width: '450px',
        data: order,
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
