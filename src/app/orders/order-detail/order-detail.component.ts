import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order, OrderDetail } from '../models/order.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
  @Input() order?: Order;
  details: OrderDetail[] = [];
  @Input() allowUpdate: boolean = false;
  @Output() saveOrder = new EventEmitter<Order>();
  n: number = 1;
  constructor() {}

  ngOnInit(): void {
    this.details = this.order ? this.order.details.map((detail) => ({ ...detail })) : [];
  }

  remove(detail: OrderDetail) {
    this.details = this.details.filter((d) => d.productId !== detail.productId);
  }

  save() {
    if (this.order) {
      this.order = { ...this.order, details: this.details };
      this.saveOrder.emit(this.order);
    }
  }

  clearShoppingCart() {
    this.details = [];
  }
}
