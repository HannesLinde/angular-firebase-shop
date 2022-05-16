import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Adapter } from '@app/core/adapter';
import { FireBaseFacade } from '@app/core/firebase-facade';
import { ProductAdapter } from './models/product-adapter';
import { ProductDto } from './models/product.dto';
import { Product } from './product.data';

@Injectable()
export class ProductsService extends FireBaseFacade<Product, ProductDto> {
  getAdapter(): Adapter<Product, ProductDto> {
    return this.adapter;
  }
  getFirestore(): Firestore {
    return this.firestore;
  }
  constructor(private firestore: Firestore, private adapter: ProductAdapter) {
    super('products');
  }
}
