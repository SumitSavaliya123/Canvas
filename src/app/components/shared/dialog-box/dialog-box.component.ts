import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss'],
})
export class DialogBoxComponent {
  dialogTitle: string = this.data.modalTitle;
  dialogDescription: string[] = this.data.modalDescription;
  dialogCancleButtonText: string = this.data.cancleButtonText;
  dialogSubmitButtonText: string = this.data.actionButtonText;
  icon!: string;
  isSubmitIcon: boolean = false;
  submitIcon!: string;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.dialogCancleButtonText == 'Cancel') {
      this.icon = 'clear';
    } else if (this.dialogCancleButtonText == 'Delete') {
      this.icon = 'delete';
    }
    if (this.dialogSubmitButtonText == 'Delete') {
      this.isSubmitIcon = true;
      this.submitIcon = 'delete';
    } else if (this.dialogSubmitButtonText == 'Edit') {
      this.isSubmitIcon = true;
      this.submitIcon = 'edit';
    }
  }

  save() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(false);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
