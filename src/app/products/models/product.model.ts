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
  images: string[];

  constructor(
    id: string,
    name: string,
    price: number,
    categoryId: string,
    type: ProductType,
    images: string[],
    description?: string,
    category?: ProductCategory
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.categoryId = categoryId;
    this.category = category;
    this.images = images || [];
    this.type = type;
    this.description = description;
  }
}