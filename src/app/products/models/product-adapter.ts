import { Injectable } from '@angular/core';
import { Adapter } from '@app/core/adapter';
import { ProductDto } from './product.dto';
import { Product, ProductTypeEnum } from './product.model';

@Injectable()
export class ProductAdapter implements Adapter<Product, ProductDto> {
  toModel(data: ProductDto): Product {
    return new Product(
      data.id,
      data.name,
      data.price,
      data.category.path.split('/')[1],
      data.type as unknown as ProductTypeEnum,
      data.description,
      undefined
    );
  }
  toDto(data: Product): ProductDto {
    throw new Error('Method not implemented.');
  }
}
