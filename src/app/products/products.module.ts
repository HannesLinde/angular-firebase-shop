import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsService } from './products.service';
import { ProductAdapter } from './models/product-adapter';
import { ProductCategoryModule } from '@app/product-category/product-category.module';

@NgModule({
  declarations: [ProductsRoutingModule.components],
  imports: [CommonModule, SharedModule, ProductsRoutingModule, ProductCategoryModule],
  providers: [ProductsService, ProductAdapter],
})
export class ProductsModule {}
