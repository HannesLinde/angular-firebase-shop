import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { SpinnerDialogComponent } from '../spinner-dialog/spinner-dialog.component';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css'],
})
export class LoadingSpinnerComponent implements OnInit, OnDestroy {
  dialogRef: MatDialogRef<SpinnerDialogComponent, any> | undefined = undefined;
  private subscriptions = new Subscription();

  errorMessage$!: Observable<string>;
  @Input('loading') loading$!: Observable<boolean>;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.loading$.subscribe((isLoading) => {
        if (isLoading) {
          this.showLoading();
        } else {
          this.hideLoading();
        }
      })
    );
  }

  showLoading() {
    this.dialogRef = this.dialog.open(SpinnerDialogComponent, {
      panelClass: 'transparent-spinner-background',
      disableClose: true,
    });
  }

  hideLoading() {
    if (this.dialogRef) this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
