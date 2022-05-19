import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FilterComponent } from './filter/filter.component';
import { ImagesPreviewComponent } from './images-preview/images-preview.component';
import { ImagePipe } from './image-pipe.pipe';

@NgModule({
  declarations: [ImagePipe, DeleteDialogComponent, FilterComponent, ImagesPreviewComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ImagePipe, ImagesPreviewComponent, FilterComponent, MaterialModule],
})
export class SharedModule {}
