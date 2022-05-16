import { ProductCategory } from '@app/product-category/models/product-category.model';

export class Product {
  name: string;
  id: string;
  price: number;
  category?: ProductCategory;
  categoryId: string;
  description?: string;

  constructor(
    id: string,
    name: string,
    price: number,
    categoryId: string,
    description?: string,
    category?: ProductCategory
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.categoryId = categoryId;
    this.category = category;
    this.description = description;
  }
}
