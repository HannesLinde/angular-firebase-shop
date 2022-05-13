import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCategoryRoutingModule } from './product-category-routing.module';
import { SharedModule } from '@app/shared/shared.module';

import { ProductCategoryService } from './product-category.service';
import { ProductCategoryDialogComponent } from './product-category-dialog/product-category-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { productReducer } from './store/reducers/product-category.reducer';
import { ProductCategoryEffect } from './store/effects/product-category.effect';

@NgModule({
  declarations: [ProductCategoryRoutingModule.components, ProductCategoryDialogComponent],
  imports: [
    SharedModule,
    ProductCategoryRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('productCategories', productReducer),
    EffectsModule.forFeature([ProductCategoryEffect]),
  ],
  providers: [ProductCategoryService],
})
export class ProductCategoryModule {}
