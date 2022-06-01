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
  productId: string;
  quantity: number;
  orderPrice: number; // the price when order is submitted
}
