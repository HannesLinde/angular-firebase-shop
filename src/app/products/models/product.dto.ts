import { ProductType } from './product.model';

export interface ProductDto {
  name: string;
  id: string;
  price: number;
  category: any;
  description?: string;
  type: ProductType;
}
