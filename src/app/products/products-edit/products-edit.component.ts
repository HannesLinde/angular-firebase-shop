import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { delay, first, Observable } from 'rxjs';

import { ProductCategory } from '@app/product-category/models/product-category.model';
import { ProductCategoryActions } from '@app/product-category/store/actions';
import { getProductCategories, State } from '@app/product-category/store/selectors/product-category.selector';

import { getProducts, State as ProductState } from '@app/products/store/selectors/products.selector';

import { Product } from '../models/product.model';
import { ProductsService } from '../products.service';
import { ProductActions } from '../store/actions';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css'],
})
export class ProductsEditComponent implements OnInit {
  productForm!: FormGroup;
  productCategories$!: Observable<ProductCategory[]>;
  private id!: string;

  constructor(
    private formBuilder: FormBuilder,
    private productCategoryStore: Store<State>,
    private productStore: Store<ProductState>,
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
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
    });

    if (this.id) {
      this.productStore
        .select(getProducts)
        .subscribe((x) => this.productForm.patchValue(x.find((product) => product.id === this.id) as Product));
    }
  }

  save() {
    if (this.productForm.valid) {
      //Product type will depend from the connected user
      const product: Product = Object.assign({ type: 'CUSTOM' }, this.productForm.value);
      if (this.id) {
        this.productService.update(this.id, product).then(() => {
          this.router.navigate(['/products'], { relativeTo: this.route });
        });
      } else {
        this.productService.add(product).then(() => {
          this.router.navigate(['/products'], { relativeTo: this.route });
        });
      }
    }
  }

  displayCategory(category1: ProductCategory, category2: ProductCategory) {
    if (category1 && category2 && category1.id === category2.id) {
      return true;
    }
    return false;
  }
}
