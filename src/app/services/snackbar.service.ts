import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  show(message: string, duration: number = 5000) {
    return this.snackBar.open(message, 'Close', {
      duration: duration,
      panelClass: 'snackbar',
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
