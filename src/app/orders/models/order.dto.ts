import { OrderStatus } from './order.model';

export interface OrderDto {
  id: string;
  total: number;
  date: Date;
  status: OrderStatus;
  details: orderDetailDto[];
  ownerId: string;
}

export interface orderDetailDto {
  productID: string;
  quantite: number;
  orderPrice: number; // the price when order is submitted
}
