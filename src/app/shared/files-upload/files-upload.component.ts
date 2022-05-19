import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImagePreview } from '../images-preview/image-preview';

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.css'],
})
export class FilesUploadComponent implements OnInit {
  @Input() previews: ImagePreview[] = [];
  @Input() selectedFiles?: File[];
  @Input() filesToDelete: string[] = [];

  @Output() previewsChange = new EventEmitter<ImagePreview[]>();
  @Output() selectedFilesChange = new EventEmitter<File[] | undefined>();
  @Output() filesToDeleteChange = new EventEmitter<string[]>();

  selectedImage?: ImagePreview;
  constructor() {}

  ngOnInit(): void {}

  filesChanged(event: any) {
    this.selectedFiles = Array.from(event.target.files as FileList);
    this.previews = this.previews.filter((p) => p.stored);
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews.push({
            url: e.target.result,
            stored: false,
            name: (this.selectedFiles && this.selectedFiles[i].name) || '',
          });
          this.selectedImage = this.selectedImage ?? this.previews[0];
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
    this.selectedFilesChange.emit(this.selectedFiles);
  }

  deleteImage(image: ImagePreview) {
    if (image.stored) {
      this.filesToDelete.push(image.name);
      this.filesToDeleteChange.emit(this.filesToDelete);
    } else {
      this.selectedFiles = this.selectedFiles?.filter((file) => file.name !== image.name);
      this.selectedFilesChange.emit(this.selectedFiles);
    }
    this.previews = this.previews?.filter((file) => file.name !== image.name);
    this.previewsChange.emit(this.previews);
  }

  selectImage(image: ImagePreview) {
    this.selectedImage = image;
  }
}
