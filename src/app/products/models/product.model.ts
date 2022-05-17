import { ProductCategory } from '@app/product-category/models/product-category.model';

export type ProductType = 'CUSTOM' | 'ENTREPRISE';

export class Product {
  name: string;
  id: string;
  price: number;
  category?: ProductCategory;
  categoryId: string;
  description?: string;
  type: ProductType;

  constructor(
    id: string,
    name: string,
    price: number,
    categoryId: string,
    type: ProductType,
    description?: string,
    category?: ProductCategory
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.categoryId = categoryId;
    this.category = category;
    this.type = type;
    this.description = description;
  }
}
