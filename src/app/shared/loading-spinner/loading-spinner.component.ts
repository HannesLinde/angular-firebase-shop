import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpinnerDialogComponent } from '../spinner-dialog/spinner-dialog.component';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css'],
})
export class LoadingSpinnerComponent implements OnInit {
  dialogRef: MatDialogRef<SpinnerDialogComponent, any> | undefined = undefined;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  showLoading() {
    this.dialogRef = this.dialog.open(SpinnerDialogComponent, {
      panelClass: 'transparent-spinner-background',
      disableClose: true,
    });
  }

  hideLoading() {
    if (this.dialogRef) this.dialogRef.close();
  }
}
