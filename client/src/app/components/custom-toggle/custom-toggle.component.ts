import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-toggle.component.html',
  styleUrl: './custom-toggle.component.scss',
})
export class CustomToggleComponent {
  @Input() yearly: boolean = false;
}
