import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-img',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-img.component.html',
  styleUrl: './icon-img.component.scss',
})
export class IconImgComponent {
  @Input() imgSrc: string = '';
  @Input() imgAlt: string = '';
  @Input() imgCssStyling: string = '';
}
