import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CapitalPipe } from '../../pipes/capital/capital.pipe';

@Component({
  selector: 'app-invalid-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, CapitalPipe],
  templateUrl: './invalid-dialog.component.html',
  styleUrl: './invalid-dialog.component.scss',
})
export class InvalidDialogComponent {
  data: { invalid: string[] } = inject(MAT_DIALOG_DATA);
}
