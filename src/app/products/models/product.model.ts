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
  mainImage: string | undefined;
  ownerId: string;

  constructor(
    id: string,
    name: string,
    price: number,
    categoryId: string,
    type: ProductType,
    images: string[],
    ownerId: string,
    description?: string,
    category?: ProductCategory
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.categoryId = categoryId;
    this.category = category;
    this.images = images || [];
    this.ownerId = ownerId;
    this.type = type;
    this.description = description;
    this.mainImage = images.length > 0 ? images[0] : undefined;
  }
}
