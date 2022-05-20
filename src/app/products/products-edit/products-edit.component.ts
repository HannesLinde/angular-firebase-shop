import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { ProductCategory } from '@app/product-category/models/product-category.model';
import { ProductCategoryActions } from '@app/product-category/store/actions';
import { getProductCategories, State } from '@app/product-category/store/selectors/product-category.selector';

import { getProducts, State as ProductState } from '@app/products/store/selectors/products.selector';

import { Product } from '../models/product.model';
import { ProductsService } from '../products.service';
import { ProductStorage } from '../products-files-storage.service';
import { ImagePreview } from '@app/shared/images-preview/image-preview';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css'],
})
export class ProductsEditComponent implements OnInit, OnDestroy {
  productForm!: FormGroup;
  productCategories$!: Observable<ProductCategory[]>;
  id!: string;
  selectedFiles?: File[];
  filesToDelete: string[] = [];

  previews: ImagePreview[] = [];
  private subscriptions = new Subscription();
  constructor(
    private formBuilder: FormBuilder,
    private productCategoryStore: Store<State>,
    private productStore: Store<ProductState>,
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: ProductStorage
  ) {}

  ngOnInit(): void {
    this.productCategories$ = this.productCategoryStore.select(getProductCategories);
    // as they are in different store
    this.productCategoryStore.dispatch(ProductCategoryActions.loadProductCategories());

    this.id = this.route.snapshot.params['id'];

    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: [null, Validators.required],
      price: [0.0, Validators.min(0)],
      description: '',
      images: [[]],
    });

    if (this.id) {
      this.subscriptions.add(this.productStore.select(getProducts).subscribe(this.getProductFromStore));
    }
  }

  save() {
    if (this.productForm.valid) {
      //Product type will depend from the connected user
      const product: Product = Object.assign({ type: 'CUSTOM' }, this.productForm.value);
      // if file not uploaded
      if (this.id) {
        this.updateProduct(product);
      } else {
        this.addProduct(product);
      }
    }
  }

  private addProduct(product: Product) {
    product.images.push(...(this.selectedFiles?.map((file: File) => file.name) || []));
    this.productService.add(product).then((id) => {
      this.uploadFiles(id);
      this.router.navigate(['/products'], { relativeTo: this.route });
    });
  }

  private updateProduct(product: Product) {
    product.images = [
      ...product.images.filter((x) => !this.filesToDelete.includes(x)),
      ...(this.selectedFiles?.map((file: File) => file.name) || []),
    ];
    this.productService.update(this.id, product).then(() => {
      //this.filesToDelete
      if (this.filesToDelete.length > 0) {
        this.storage.removeFiles(this.filesToDelete, this.id);
      }
      if (this.selectedFiles && this.selectedFiles?.length > 0) {
        this.uploadFiles(this.id);
      }
      this.router.navigate(['/products'], { relativeTo: this.route });
    });
  }

  private async uploadFiles(id?: string) {
    return await Promise.all([this.selectedFiles?.map((file: File) => this.storage.uploadFile(file, id))]);
  }

  private getProductFromStore = (products: Product[]) => {
    const product = products.find((product) => product.id === this.id) as Product;
    if (product) {
      this.productForm.patchValue(product);
      this.previews = [];

      if (product.images && product.images.length > 0) {
        this.previews.push(
          ...product.images.map((image) => ({
            url: this.getImageUrlFromStore(image, this.id),
            stored: true,
            name: image,
          }))
        );
      }
    }
  };

  private getImageUrlFromStore = (image: string, id: string) => this.storage.getFileUrl(image, id);

  displayCategory(category1: ProductCategory, category2: ProductCategory) {
    if (category1 && category2 && category1.id === category2.id) {
      return true;
    }
    return false;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
