import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ProductCategory } from '@app/product-category/models/product-category.model';
import { ProductCategoryActions } from '@app/product-category/store/actions';
import { getProductCategories, State } from '@app/product-category/store/selectors/product-category.selector';

import { State as ProductState } from '@app/products/store/selectors/products.selector';

import { Product } from '../models/product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css'],
})
export class ProductsEditComponent implements OnInit {
  productForm!: FormGroup;
  productCategories$!: Observable<ProductCategory[]>;

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

    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: [0.0, Validators.min(0)],
      description: '',
    });
  }

  save() {
    if (this.productForm.valid) {
      //Product type will depend from the connected user
      const product: Product = Object.assign({ type: 'CUSTOM' }, this.productForm.value);
      this.productService.add(product).then(() => {
        this.router.navigate(['/products'], { relativeTo: this.route });
      });
    }
  }
}
