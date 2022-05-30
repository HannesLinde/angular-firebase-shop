import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {
    this.orderService.getAll().subscribe((data) => console.log(data));
  }
}
