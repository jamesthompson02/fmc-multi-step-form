import { Component, Input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddOn } from '../../models/add-on.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-on',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './add-on.component.html',
  styleUrl: './add-on.component.scss',
})
export class AddOnComponent {
  @Input() value: AddOn = {
    formControlName: '',
    heading: '',
    subHeading: '',
    price: { monthly: '', yearly: '' },
  };
  @Input() yearly: boolean = false;
}
