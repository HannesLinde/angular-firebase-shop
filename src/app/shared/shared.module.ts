import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FilterComponent } from './filter/filter.component';
import { ImagesPreviewComponent } from './images-preview/images-preview.component';
import { ImagesPreviewPipe } from './images-preview-pipe.pipe';
import { FilesUploadComponent } from './files-upload/files-upload.component';
import { ImageUrlPipe } from './image-url-pipe.pipe';
import { SpinnerDialogComponent } from './spinner-dialog/spinner-dialog.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    FilesUploadComponent,
    ImagesPreviewPipe,
    ImageUrlPipe,
    DeleteDialogComponent,
    FilterComponent,
    ImagesPreviewComponent,
    SpinnerDialogComponent,
    LoadingSpinnerComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    FilesUploadComponent,
    ImagesPreviewPipe,
    ImageUrlPipe,
    ImagesPreviewComponent,
    FilterComponent,
    MaterialModule,
    LoadingSpinnerComponent,
  ],
})
export class SharedModule {}
