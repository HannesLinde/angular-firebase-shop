import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FireBaseFacade } from '../core/firebase-facade';
import { ProductCategoryItem } from './product-category-datasource';

@Injectable()
export class ProductCategoryService extends FireBaseFacade<ProductCategoryItem> {
  constructor(firestore: Firestore) {
    super(firestore, 'category');
  }
}
