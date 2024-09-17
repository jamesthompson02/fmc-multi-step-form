import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SelectedIndexService } from '../../services/selectedIndex/selected-index.service';
import {
  FormGroup,
  ReactiveFormsModule,
  ValueChangeEvent,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '../button/button.component';
import { MatRadioModule } from '@angular/material/radio';
import { CardRadioComponent } from '../card-radio/card-radio.component';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { PlanOption } from '../../models/plan-option.model';

@Component({
  selector: 'app-step-form',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    ButtonComponent,
    CardRadioComponent,
    MatCheckboxModule,
  ],
  templateUrl: './step-form.component.html',
  styleUrl: './step-form.component.scss',
})
export class StepFormComponent implements OnInit, OnDestroy {
  @Input() stepperForm!: FormGroup;
  @Input() stepFormCssStyling: string = '';

  selectedStepIndex!: number;
  sub: Subscription;

  yearlyPayment!: boolean;

  planOptions: PlanOption[] = [
    {
      value: 'Arcade',
      cardImg: 'icon-arcade.svg',
      cardImgAlt: 'Icon of old joystick controller.',
      price: { monthly: '$9/month', yearly: '$90/year' },
    },
    {
      value: 'Advanced',
      cardImg: 'icon-advanced.svg',
      cardImgAlt: 'Icon of  old gamepad controller.',
      price: { monthly: '$12/month', yearly: '$120/year' },
    },
    {
      value: 'Pro',
      cardImg: 'icon-pro.svg',
      cardImgAlt: 'Icon of modern game controller.',
      price: { monthly: '$15/month', yearly: '$150/year' },
    },
  ];

  constructor(private selectedIndexService: SelectedIndexService) {
    this.sub = this.selectedIndexService.selectedIndex$.subscribe(
      (selectedIndex) => (this.selectedStepIndex = selectedIndex)
    );
  }

  ngOnInit(): void {
    this.yearlyPayment = this.stepperForm.get('plans.yearly')?.value;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  previousStep() {
    const newIndex = this.selectedStepIndex - 1;
    this.selectedIndexService.updateSelectedIndex(newIndex);
  }

  nextStep() {
    // const isValid = this.stepperForm.get('info')?.valid;
    // if (!isValid) return;
    const newIndex = this.selectedStepIndex + 1;
    this.selectedIndexService.updateSelectedIndex(newIndex);
  }

  updateYearlyPayment(event: MatCheckboxChange) {
    this.yearlyPayment = event.checked;
  }
}
