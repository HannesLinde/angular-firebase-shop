import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FilterComponent } from './filter/filter.component';
import { ImagesPreviewComponent } from './images-preview/images-preview.component';
import { ImagePipe } from './image-pipe.pipe';
import { FilesUploadComponent } from './files-upload/files-upload.component';

@NgModule({
  declarations: [FilesUploadComponent, ImagePipe, DeleteDialogComponent, FilterComponent, ImagesPreviewComponent],
  imports: [CommonModule, MaterialModule],
  exports: [FilesUploadComponent, ImagePipe, ImagesPreviewComponent, FilterComponent, MaterialModule],
})
export class SharedModule {}
