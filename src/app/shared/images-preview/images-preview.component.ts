import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-images-preview',
  templateUrl: './images-preview.component.html',
  styleUrls: ['./images-preview.component.css'],
})
export class ImagesPreviewComponent implements OnInit {
  @Input() previews: FilePreview[] = [];
  @Output() delete = new EventEmitter<FilePreview>();

  constructor() {}

  ngOnInit(): void {}

  deleteFile(filePreview: FilePreview) {
    this.delete.emit(filePreview);
  }
}

interface FilePreview {
  url: string;
  stored: boolean;
  name: string;
}
