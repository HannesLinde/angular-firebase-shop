import { Injectable } from '@angular/core';
import { Adapter } from '@app/core/adapter';
import { OrderDto } from './order.dto';
import { Order } from './order.model';

@Injectable()
export class OrderAdapter implements Adapter<Order, OrderDto> {
  toModel(data: OrderDto): Order {
    return Object.assign({}, data) as Order;
  }
  toDto(data: Order): OrderDto {
    const { id, ...order } = { ...data };
    return order as OrderDto;
  }
}
