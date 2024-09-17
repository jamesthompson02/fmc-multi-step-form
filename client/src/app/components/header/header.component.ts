import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() text: string = '';
  @Input() size: 1 | 2 | 3 | 4 | 5 | 6 = 2;
  @Input() headerCssStyling: string = '';
}
