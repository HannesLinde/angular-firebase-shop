import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-spinner-dialog',
  templateUrl: './spinner-dialog.component.html',
  styleUrls: ['./spinner-dialog.component.css'],
})
export class SpinnerDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<SpinnerDialogComponent>) {}

  ngOnInit(): void {}
}
