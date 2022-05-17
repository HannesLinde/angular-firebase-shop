import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [DeleteDialogComponent, FilterComponent],
  imports: [CommonModule, MaterialModule],
  exports: [FilterComponent, MaterialModule],
})
export class SharedModule {}
