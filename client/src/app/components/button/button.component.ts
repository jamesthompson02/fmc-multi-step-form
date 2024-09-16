import { CommonModule } from '@angular/common';
import { Component, Input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() buttonCssStyling: string = '';

  onClick = output<any>();

  handleClick(event: Event) {
    this.onClick.emit(event);
  }
}
