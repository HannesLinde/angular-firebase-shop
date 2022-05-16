import { Injectable } from '@angular/core';
import { Adapter } from '@app/core/adapter';
import { ProductDto } from './product.dto';
import { Product } from './product.model';

@Injectable()
export class ProductAdapter implements Adapter<Product, ProductDto> {
  toModel(data: ProductDto): Product {
    return new Product(data.id, data.name);
  }
  toDto(data: Product): ProductDto {
    throw new Error('Method not implemented.');
  }
}
