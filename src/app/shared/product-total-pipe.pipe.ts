import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productTotalPipe',
})
export class ProductTotalPipe implements PipeTransform {
  transform(price: number, quantity: number): number {
    return quantity > 0 ? price * quantity : 0;
  }
}
