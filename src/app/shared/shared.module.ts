import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FilterComponent } from './filter/filter.component';
import { ImagesPreviewComponent } from './images-preview/images-preview.component';
import { ImagesPreviewPipe } from './images-preview-pipe.pipe';
import { FilesUploadComponent } from './files-upload/files-upload.component';
import { ImageUrlPipe } from './image-url-pipe.pipe';

@NgModule({
  declarations: [
    FilesUploadComponent,
    ImagesPreviewPipe,
    ImageUrlPipe,
    DeleteDialogComponent,
    FilterComponent,
    ImagesPreviewComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    FilesUploadComponent,
    ImagesPreviewPipe,
    ImageUrlPipe,
    ImagesPreviewComponent,
    FilterComponent,
    MaterialModule,
  ],
})
export class SharedModule {}
