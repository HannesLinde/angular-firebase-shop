import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Adapter } from '@app/core/adapter';
import { FireBaseFacade } from '../core/firebase-facade';
import { ProductCategoryAdapter } from './models/product-category-adapter';
import { ProductCategoryDto } from './models/product-category.dto';
import { ProductCategory } from './models/product-category.model';

@Injectable()
export class ProductCategoryService extends FireBaseFacade<ProductCategory, ProductCategoryDto> {
  getAdapter(): Adapter<ProductCategory, ProductCategoryDto> {
    return this.adapter;
  }
  getFirestore(): Firestore {
    return this.firestore;
  }
  constructor(private firestore: Firestore, private adapter: ProductCategoryAdapter) {
    super('category');
  }
}
