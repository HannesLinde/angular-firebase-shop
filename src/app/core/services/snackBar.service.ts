import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef,
  MatSnackBarVerticalPosition,
  SimpleSnackBar,
} from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  openSuccessSnackBar(
    message: string,
    action: string | undefined,
    position: MatSnackBarVerticalPosition = 'top'
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: position,
      panelClass: ['success-snackbar'],
    });
  }

  openErrorSnackBar(
    message: string,
    action: string | undefined,
    position: MatSnackBarVerticalPosition = 'top'
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: position,
      panelClass: ['error-snackbar'],
    });
  }
}
