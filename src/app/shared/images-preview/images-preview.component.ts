import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImagePreview } from './image-preview';

@Component({
  selector: 'app-images-preview',
  templateUrl: './images-preview.component.html',
  styleUrls: ['./images-preview.component.css'],
})
export class ImagesPreviewComponent implements OnInit {
  @Input() previews: ImagePreview[] = [];
  @Output() delete = new EventEmitter<ImagePreview>();

  constructor() {}

  ngOnInit(): void {}

  deleteFile(ImagePreview: ImagePreview) {
    this.delete.emit(ImagePreview);
  }
}
