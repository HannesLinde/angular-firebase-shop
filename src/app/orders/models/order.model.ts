import { Product } from '@app/products/models/product.model';

export type OrderStatus = 'NOT SUBMITTED' | 'SUBMITTED' | 'IN PREPERATION' | 'DELIVERED';

export class Order {
  id: string;
  total: number;
  date: Date;
  status: OrderStatus;
  ownerId: string;
  details: OrderDetail[];

  constructor(id: string, total: number, date: Date, status: OrderStatus, details: OrderDetail[], ownerId: string) {
    this.id = id;
    this.date = date;
    this.total = total;
    this.status = status;
    this.details = details || [];
    this.ownerId = ownerId;
  }
}

export interface OrderDetail {
  productId: string;
  quantity: number;
  orderPrice: number;
  product?: Product;
}
