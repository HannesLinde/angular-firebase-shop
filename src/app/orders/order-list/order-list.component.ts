import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  @Input() orders$!: Observable<Order[]>;
  @Output() selectOrder = new EventEmitter<Order>();
  selectedorder!: Order;
  @ViewChild(MatTable) table!: MatTable<Order>;

  dataSource!: MatTableDataSource<Order>;
  displayedColumns = ['date', 'status', 'total'];

  constructor() {}

  ngOnInit(): void {}

  select(order: Order) {
    this.selectOrder.emit(order);
    this.selectedorder = order;
  }
}
