import { Injectable } from '@angular/core';
import { addDoc, collection, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Adapter } from '@app/core/adapter';
import { FireBaseFacade } from '@app/core/firebase-facade';
import { ProductCategoryService } from '@app/product-category/product-category.service';
import { catchError, combineLatest, map } from 'rxjs';
import { ProductAdapter } from './models/product-adapter';
import { ProductDto } from './models/product.dto';
import { Product } from './models/product.model';
const COLLECTION = 'products';

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
    super(COLLECTION);
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
  // to resolve reference to object
  override async add(data: Product) {
    const ref = collection(this.firestore, COLLECTION);
    const docRef = await addDoc(ref, {
      ...this.getAdapter().toDto(data),
      category: doc(this.getFirestore(), `category/${data.category?.id}`),
    });
    return docData(docRef, { idField: 'id' }).pipe(
      map((object) => this.getAdapter().toModel(object as ProductDto)),
      catchError(this.handleError)
    );
  }

  override async update(id: string, data: Product) {
    return updateDoc(doc(this.getFirestore(), `${COLLECTION}/${id}`), {
      ...this.getAdapter().toDto(data),
      category: doc(this.getFirestore(), `category/${data.category?.id}`),
    });
  }
}
