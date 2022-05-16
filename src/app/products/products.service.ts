import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Adapter } from '@app/core/adapter';
import { FireBaseFacade } from '@app/core/firebase-facade';
import { ProductCategoryService } from '@app/product-category/product-category.service';
import { combineLatest, map } from 'rxjs';
import { ProductAdapter } from './models/product-adapter';
import { ProductDto } from './models/product.dto';
import { Product } from './models/product.model';

@Injectable()
export class ProductsService extends FireBaseFacade<Product, ProductDto> {
  getAdapter(): Adapter<Product, ProductDto> {
    return this.adapter;
  }
  getFirestore(): Firestore {
    return this.firestore;
  }
  constructor(
    private firestore: Firestore,
    private adapter: ProductAdapter,
    private productCategory: ProductCategoryService
  ) {
    super('products');
  }

  productsWithCategory$ = combineLatest([this.getAll(), this.productCategory.getAll()]).pipe(
    map(([products, categories]) =>
      products.map(
        (product) =>
          ({
            ...product,
            category: categories.find((c) => product.categoryId === c.id),
          } as Product)
      )
    )
  );
}
