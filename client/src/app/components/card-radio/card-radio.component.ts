import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { IconImgComponent } from '../icon-img/icon-img.component';
import { PlanOption, Price } from '../../models/plan-option.model';

@Component({
  selector: 'app-card-radio',
  standalone: true,
  imports: [MatRadioModule, CommonModule, IconImgComponent],
  templateUrl: './card-radio.component.html',
  styleUrl: './card-radio.component.scss',
})
export class CardRadioComponent {
  @Input() value: PlanOption = {
    value: '',
    cardImg: '',
    cardImgAlt: '',
    price: { monthly: '', yearly: '' },
  };
  @Input() yearly: boolean = false;
}
