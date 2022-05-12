import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCategoryRoutingModule } from './product-category-routing.module';
import { SharedModule } from '@app/shared/shared.module';

import { ProductCategoryService } from './product-category.service';

@NgModule({
  declarations: [ProductCategoryRoutingModule.components],
  imports: [SharedModule, ProductCategoryRoutingModule, CommonModule],
  providers: [ProductCategoryService],
})
export class ProductCategoryModule {}
