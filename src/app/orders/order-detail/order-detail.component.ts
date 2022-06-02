import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order, OrderDetail } from '../models/order.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
  @Input() order!: Order;
  @Input() allowUpdate: boolean = false;
  @Output() saveOrder = new EventEmitter<Order>();

  details: OrderDetail[] = [];

  constructor() {}

  ngOnInit(): void {
    this.createDetailsCopy();
  }

  remove(detail: OrderDetail) {
    this.details = this.details.filter((d) => d.productId !== detail.productId);
  }

  save() {
    this.order = { ...this.order, details: this.details };
    this.saveOrder.emit(this.order);
    this.createDetailsCopy();
  }

  submit() {
    this.order = { ...this.order, details: this.details, status: 'SUBMITTED' };
    this.saveOrder.emit(this.order);
    this.createDetailsCopy();
  }

  clearShoppingCart() {
    this.details = [];
  }

  change(detail: OrderDetail) {
    if (detail.quantity < 1) detail.quantity = 1;
  }

  // to avoid readOnly issue as order/detail in store
  private createDetailsCopy() {
    this.details = this.order ? this.order.details.map((detail) => ({ ...detail })) : [];
  }
}
