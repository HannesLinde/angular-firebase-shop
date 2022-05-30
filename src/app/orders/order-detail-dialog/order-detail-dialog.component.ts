import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.css'],
})
export class OrderDetailDialogComponent implements OnInit {
  order: Order;
  constructor(
    public dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Order
  ) {
    this.order = data;
  }

  ngOnInit(): void {}
}
