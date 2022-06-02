import { Pipe, PipeTransform } from '@angular/core';
import { OrderDetail } from './models/order.model';

@Pipe({
  name: 'orderTotalPipe',
  pure: false,
})
export class orderTotalPipe implements PipeTransform {
  transform(value: number, details: OrderDetail[]) {
    return details.reduce((acc, detail) => acc + detail.orderPrice * detail.quantity, 0);
  }
}
