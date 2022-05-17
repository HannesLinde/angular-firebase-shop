import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent implements OnInit {
  element: any = null;

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { identifier: string; display: string }
  ) {
    this.element = data;
  }

  ngOnInit(): void {}

  onValidate() {
    this.dialogRef.close(this.element.identifier);
  }

  onCancle() {
    this.dialogRef.close();
  }
}
