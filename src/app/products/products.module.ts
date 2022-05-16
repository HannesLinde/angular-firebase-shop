import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsService } from './products.service';
import { ProductAdapter } from './models/product-adapter';
import { ProductCategoryModule } from '@app/product-category/product-category.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffect } from './store/effects/products.effect';
import { productReducer } from './store/reducers/products.reducer';

@NgModule({
  declarations: [ProductsRoutingModule.components],
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule,
    ProductCategoryModule,
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([ProductEffect]),
  ],
  providers: [ProductsService, ProductAdapter],
})
export class ProductsModule {}
