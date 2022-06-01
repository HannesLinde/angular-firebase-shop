import { Injectable } from '@angular/core';
import { Adapter } from '@app/core/adapter';
import { ProductDto } from './product.dto';
import { Product } from './product.model';

@Injectable()
export class ProductAdapter implements Adapter<Product, ProductDto> {
  toModel(data: ProductDto): Product {
    return new Product(
      data.id,
      data.name,
      data.price,
      data.category.path.split('/')[1],
      data.type,
      data.images,
      data.ownerId,
      data.description
    );
  }
  toDto(data: Product): ProductDto {
    return { ...data, category: 'category/' + data.category?.id };
  }
}
