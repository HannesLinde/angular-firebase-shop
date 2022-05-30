import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { Order } from './models/order.model';
import { OrderDetailDialogComponent } from './order-detail-dialog/order-detail-dialog.component';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders$!: Observable<Order[]>;
  selectedOrder!: Order;
  constructor(private orderService: OrdersService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.orders$ = this.orderService.getAll();
  }

  onOrderSelected(order: Order) {
    this.selectedOrder = order;
    /*let dialogRef = this.dialog.open(OrderDetailDialogComponent, {
      width: '450px',
      data: order,
    });*/
  }
}
