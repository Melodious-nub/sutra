import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImagePreviewDialogComponent } from '../admin/modals/image-preview-dialog/image-preview-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class PhotoViewerService {

  constructor(public dialog: MatDialog) { }

  openViewer(imgUrl: string): void {
    this.dialog.open(ImagePreviewDialogComponent, {
      data: { imgUrl },
      panelClass: 'custom-dialog-container' // Optional for custom styles
    });
  }
  
}
